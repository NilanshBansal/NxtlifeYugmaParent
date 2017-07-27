import { Component } from '@angular/core';
import { ModalController,Events } from 'ionic-angular';

// import modal
import { newComplaintModal } from './new/newComplaintModal';
import { ViewComponent } from './view/viewComplaintModal';

// import service
import { CustomService } from '../../service/custom.service';
import { ComplaintSuggestion } from '../../service/cs.service';
//import { Network } from '@ionic-native/network';
//pouchdb service
import { PouchDbService } from '../../service/pouchdbservice';



@Component({
  selector: 'complaint-page',
  templateUrl: 'complaint.html'
})

export class ComplaintPage {

  allData = [];
  EmptyComplaints = false;
  currentPage: number = 1;
  // url = 'http://nxtlife-testing.ind-cloud.everdata.com//parent/36926627705/complaint/page/1';
  // opts = { live: true, retry: true };

  // set header title
  title: string = "COMPLAINTS";

  // used in event
  public master: string = "complaint";

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public pouchdbservice:PouchDbService,
              public events: Events
              ) { }
 /*syncData(){

          
db.replicate.from(url).on('complete', function(info) {
  // then two-way, continuous, retriable sync
  db.sync(url, opts)
    .on('change', onSyncChange)
    .on('paused', onSyncPaused)
    .on('error', onSyncError);
}).on('error', onSyncError);;

 }*/

  ionViewWillEnter() {
    
    this.getAllData("cmp_");
    this.getCategories();
//nilansh


  //   alert("syncing...");
  //   this.pouchdbservice.syncData();
  //   alert("called");
    
  }

  /*addDb(){
    this.nl.showLoader();
    this.c.getComplaints(this.currentPage).subscribe((res) => {
      this.onSuccess(res);
      console.log(res);
      this.pouchdbservice.add(res);
    }, (err) => {
      console.log("error");
      alert("error");
      this.nl.onError(err);
    });
  }*/
  
  destroyDb(){
    this.pouchdbservice.delete();
  }

  getAllData(stringvar) {

    this.nl.showLoader();
    this.c.getComplaints(this.currentPage).subscribe((res) => {
      this.onSuccess(res);
      console.log(res);
      this.pouchdbservice.add(res,stringvar);
      /*alert("finding doc");
      this.pouchdbservice.findDoc(res,stringvar);*/
    }, (err) => {
      alert("error aagya");
      this.nl.onError(err);
      let that =this;
      this.pouchdbservice.getAllComplaints(stringvar).then(function(res){
        console.log("see res from db");
        that.allData=res;
        console.log(that.allData);
      });
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
      console.table(res);
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

  openViewModal(viewData, index): void {
    let openViewModal = this.modalCtrl.create(ViewComponent, {viewData: viewData});
    openViewModal.onDidDismiss((res) => {
      this.allData[index] = res;
    })
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
