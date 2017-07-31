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
  stringvar;
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


  ionViewWillEnter() {
    
    this.getAllData("cmp_");
    this.getCategories();
   
  }

  destroyDb(){
    this.pouchdbservice.destroyDb();
  }

  getAllData(stringvar) {

    this.nl.showLoader();
    this.c.getComplaints(this.currentPage).subscribe((res) => {
      this.onSuccess(res);
      console.log("see complaints res: ",res);
      this.pouchdbservice.add(res,stringvar);
      
    }, (err) => {
      this.nl.onError(err);
      let that =this;
      this.pouchdbservice.getAllComplaints(stringvar).then(function(res){
        that.allData=res;
      });
    });
    
  }

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
      console.log(res);
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
      console.log("see res after load more 11111: ",res);
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
    if(this.nl.getHeaderText()=="complaint")
    {
      this.stringvar="cmp_";
    }
    if(this.nl.getHeaderText()=="suggestion")
    {
      this.stringvar="sgsyour_";
    }
    if(this.nl.getHeaderText()=="appreciation")
    {
      this.stringvar="apreyour_";
    }

    
    this.allData = this.allData.concat(res);
    this.pouchdbservice.addWithoutDelete(res,this.stringvar);
  
  }

  loadDataError(err) {
    this.currentPage -= 1;
    this.showEmptyMsg(false);
    this.nl.onError(err);
  }

}
