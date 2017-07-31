import { Component, ViewChild } from '@angular/core';
import { ModalController, AlertController, ToastController, Content } from 'ionic-angular';

import { NewMessagePage } from './new/new';
import { ViewMessagePage } from './view/view';

// import service
import { CustomService } from '../../service/custom.service';
import { MessageService } from '../../service/message.service';
import { AuthService } from '../../service/auth.service';
import * as _ from 'underscore';
import { PouchDbService } from "../../service/pouchdbservice";


@Component({
  selector: 'message',
  templateUrl: 'message.html'
})

export class MessagePage {

  public title: string = "Messaging";
  public emptyMessages: boolean = false;
  public allData = [];
  public currentPage: number = 1;
  @ViewChild(Content) content: Content;

  constructor(public messageService: MessageService,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public commonService: AuthService,
              public nl: CustomService,
              public pouchdbservice:PouchDbService) {
    this.sockJsConnection();
  }

  public sockJsConnection() {
    let stompClient = this.commonService.getSockJs();
    let id = localStorage.getItem('id');
    let url = '/parent/'+ id +'/conversation';
    let that = this;
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(url, function (greeting) {
        let message = JSON.parse(greeting.body);
        if (!message) {
          return;
        }
        that.allData.unshift(message);
        that.showToastMessage();
      });
    });
  }

  public showToastMessage() {
    let toast = this.toastCtrl.create({
      message: 'New Message Received.',
      position: 'bottom',
      duration: 5000,
      closeButtonText: 'VIEW',
      showCloseButton: true
    });
    toast.onDidDismiss(() => {
      this.content.scrollToTop();
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.nl.showLoader();
    this.messageService.getAllMessages(1)
    .subscribe((res) => {
      if (res.status === 204) {
        this.emptyMessages = true;
      } else {
        this.buildData(res);
      }
      this.pouchdbservice.add(this.allData,"msg_");
      this.nl.hideLoader();
    }, (err) => {
      this.onError(err);
      let that=this;
      this.pouchdbservice.getAllComplaints("msg_").then(function(result){
        that.buildData(result);
      });
    });
  }

  public buildData(data) {
    this.allData = data;
    this.emptyMessages = false;
    _.forEach(this.allData, (val, index) => {
      if (val.againstEmployeeName == null) {
        val.againstEmployeeName = val.firstMessage.employeeName
      }
    });
  }

  public onError(err) {
    this.nl.onError(err);
  }

  public createNew() {
    let createNew = this.modalCtrl.create(NewMessagePage);
    createNew.onDidDismiss((newData) => {
      if (!newData) { return; }
      if (!this.allData) { this.allData = []; }
      this.emptyMessages = false;
      this.allData.unshift(newData);
    });
    createNew.present();
  }

  public openViewModal(message) {
    this.nl.showLoader();
    let that=this;
    this.messageService.getMessage(message.id, 1).subscribe((res) => {
      console.log("see res : ",res);
      this.pouchdbservice.addArrayOfObjectsToDoc(res,message.id,"msgchats_");
      this.nl.hideLoader();
      let viewModal = this.modalCtrl.create(ViewMessagePage, {id: message.id, messages: res, conversation: message});
      viewModal.present();
    }, (err) => {
      this.nl.onError(err);
      this.pouchdbservice.findDoc(message.id,"msgchats_").then(function(result){
        console.log("see result from db: ",result);
        console.log("id: ",message.id);
        console.log("messages: ",result);
        console.log("conversation: ",message);
        var outputArray = that.convertObjToArray(result);
        console.log("data from db: ", outputArray);
        let viewModal = that.modalCtrl.create(ViewMessagePage, {id: message.id, messages: outputArray, conversation: message});
      viewModal.present();
      });
    });
  }

  convertObjToArray(res) {
    var resArray = [];
    var len = res["length"];
    for (var i = 0; i < len; i++) {
      resArray[i] = res[i];
    }
    if (len == 0) {
      alert("len 0");
      resArray = [];
    }
    return resArray;
  }


  public doRefresh(refresher) {
    setTimeout(() => {
      this.messageService.getAllMessages(1).subscribe((res) => {
        if (res.status === 204) {
          this.emptyMessages = true;
        } else {
          this.buildData(res);
        }
        refresher.complete();
      }, (err) => {
        refresher.complete();
        this.onError(err);
      });
    }, 500);
  }

  public doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.loadMoreData(infiniteScroll);
    }, 500);
  }

  public loadMoreData(infiniteScroll) {
    this.messageService.getAllMessages(this.currentPage).subscribe((response) => {
      if (response.status === 204) {
        this.currentPage -= 1;
        infiniteScroll.complete();
        return;
      }
      let data = [];
      data = response;
      _.forEach(data, (val, index) => {
        if (val.againstEmployeeName == null) {
          val.againstEmployeeName = val.firstMessage.employeeName
        }
      });
      this.allData = this.allData.concat(data);
      this.pouchdbservice.addWithoutDelete(data,"msg_");
      infiniteScroll.complete();
    }, (err) => {
      infiniteScroll.complete();
      this.currentPage -= 1;
      this.onError(err);
    });
  }

  public presentConfirm(conversationId) {
    let alert = this.alertCtrl.create({
      title: 'Close this conversation?',
      buttons: [{
        text: 'Keep',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Close it',
        handler: () => {
          this.closeConversation(conversationId);
        } 
      }]
    });
    alert.present();
  }

  public closeConversation(conversation) {
    let that=this;
    var foundConversation;
    this.nl.showLoader();
    this.messageService.closeConversation(conversation.id).subscribe((res) => {
      console.log("res", res);
      this.nl.hideLoader();
      this.nl.showToast("Conversation successfully closed");
      conversation.isClosed = true;
      this.pouchdbservice.findDoc(conversation.id,"msg_").then(function(doc){
        foundConversation=doc;
        return that.pouchdbservice.deleteDoc(doc);
      }).then(function(arg){
        console.log("see found",foundConversation);
        foundConversation.isClosed="true";
        delete foundConversation["_rev"];
        delete foundConversation["_id"];
        
        that.pouchdbservice.addSingle(foundConversation,"msg_",conversation.id);
      });
    }, (err) => {
      this.nl.onError(err);
    })
  }

}