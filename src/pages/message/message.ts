import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { NewMessagePage } from './new/new';
import { ViewMessagePage } from './view/view';

// import service
import { CustomService } from '../../service/custom.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'message',
  templateUrl: 'message.html'
})

export class MessagePage {

  public title: string = "Messaging";
  public emptyMessages: boolean = false;
  public allData = [];
  public currentPage: number = 1;

  constructor(public messageService: MessageService,
              public modalCtrl: ModalController,
              public nl: CustomService) {

  }

  ionViewWillEnter() {
    this.nl.showLoader();
    this.messageService.getAllMessages(1).subscribe((res) => {
      console.log("QQQ", res);
      if (res.status === 204) {
        this.emptyMessages = true;
      } else {
        this.allData = res;
        this.emptyMessages = false;
      }
      this.nl.hideLoader();
    }, (err) => {
      console.log("err", err);
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

  public openViewModal(id, message) {
    let viewModal = this.modalCtrl.create(ViewMessagePage, {id: id, message: message});
    viewModal.present();
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

}