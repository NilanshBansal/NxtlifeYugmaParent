import { Component } from '@angular/core';
import { ModalController,
         AlertController,
         ActionSheetController,
         ItemSliding } from 'ionic-angular';

// import modal
import { newComplaintModal } from './new/newComplaintModal';
import { ViewComponent } from './view/viewComplaintModal';

// import service
import { CustomService } from '../../service/custom.service';
import { ComplaintSuggestion } from '../../service/cs.service';

@Component({
  selector: 'complaint-page',
  templateUrl: 'complaint.html'
})

export class ComplaintPage {

  allData = [];
  EmptyComplaints = false;
  currentPage: number = 1;

  // set header title
  title: string = "COMPLAINTS";

  // used in event
  public master: string = "complaint";

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion) { }

  ionViewWillEnter() {
    this.getAllData();
    this.getCategories();
  }

  getAllData() {
    this.nl.showLoader();
    this.c.getComplaints(this.currentPage).subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.nl.onError(err);
    });
  }

  // its used in new complaint
  getCategories() {
    this.c.getCategories().subscribe((categories) => {
      this.c.storeCategories(categories);
    });
  }

  showEmptyMsg(val) {
    this.EmptyComplaints = val;
  }

  onSuccess(res) {
    if (res.status === 204) {
      this.showEmptyMsg(true);
    } else {
      this.showEmptyMsg(false);
      this.allData = res;
    }
    this.nl.hideLoader();
  }

  createNew(): void {
    let createNew = this.modalCtrl.create(newComplaintModal);
    createNew.onDidDismiss((newData) => {
      if (!newData) { return; }
      if (!this.allData) { this.allData = []; }
      this.showEmptyMsg(false);
      this.allData.unshift(newData);
    });
    createNew.present();
  }

  openViewModal(viewData): void {
    let openViewModal = this.modalCtrl.create(ViewComponent, {viewData: viewData});
    openViewModal.present();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.c.getComplaints(1).subscribe((res) => {
        this.onSuccess(res);
        refresher.complete();
      }, (err) => {
        refresher.complete();
        this.nl.onError(err);
      });
    }, 500);
  }

  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.loadMoreData(infiniteScroll);
    }, 500);
  }

  loadMoreData(infiniteScroll) {
    this.c.getComplaints(this.currentPage).subscribe((res) => {
      infiniteScroll.complete();
      this.loadDataSuccess(res);
    }, (err) => {
      infiniteScroll.complete();
      this.loadDataError(err);
    });
  }

  loadDataSuccess(res) {
    if (res.status === 204) {
      this.currentPage -= 1;
      return;
    }
    this.allData = this.allData.concat(res);
  }

  loadDataError(err) {
    this.currentPage -= 1;
    this.showEmptyMsg(false);
    this.nl.onError(err);
  }

}
