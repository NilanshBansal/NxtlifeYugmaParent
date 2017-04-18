import { Component, ViewChild } from '@angular/core';
import { ModalController, AlertController, ToastController, Content } from 'ionic-angular';

import { NewMessagePage } from './new/new';
import { ViewMessagePage } from './view/view';
import { ItemSliding } from 'ionic-angular';

// import service
import { CustomService } from '../../service/custom.service';
import { MessageService } from '../../service/message.service';
import { CommonService } from '../../service/common.service'; 

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
              public commonService: CommonService,
              public nl: CustomService) {
    this.sockJsConnection();
  }

  public sockJsConnection() {
    let stompClient = this.commonService.getSockJs();
    let id = this.commonService.getData('id');
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
    this.messageService.getAllMessages(1).subscribe((res) => {
      if (res.status === 204) {
        this.emptyMessages = true;
      } else {
        this.allData = res;
        this.emptyMessages = false;
      }
      this.nl.hideLoader();
    }, (err) => {
      this.onError(err);
    })
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

  public openViewModal(id) {
    this.nl.showLoader();
    this.messageService.getMessage(id, 1).subscribe((res) => {
      this.nl.hideLoader();
      let message = res;
      let viewModal = this.modalCtrl.create(ViewMessagePage, {id: id, message: message});
      viewModal.present();
    }, (err) => {
      this.nl.onError(err);
    });
  }

  public doRefresh(refresher) {
    setTimeout(() => {
      this.messageService.getAllMessages(1).subscribe((res) => {
        if (res.status === 204) {
          this.emptyMessages = true;
        } else {
          this.allData = res;
          this.emptyMessages = false;
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
      infiniteScroll.complete();
      this.allData = this.allData.concat(response);
    }, (err) => {
      infiniteScroll.complete();
      this.currentPage -= 1;
      this.onError(err);
    });
  }

  public presentConfirm(slidingItem: ItemSliding, conversationId) {
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
          slidingItem.close();
          this.closeConversation(conversationId);
        } 
      }]
    });
    alert.present();
  }

  public closeConversation(conversationId) {
    this.nl.showLoader();
    this.messageService.closeConversation(conversationId).subscribe((res) => {
      console.log("res", res);
      this.nl.hideLoader();
      this.nl.showToast("Conversation successfully closed");
    }, (err) => {
      this.nl.onError(err);
    })
  }

}