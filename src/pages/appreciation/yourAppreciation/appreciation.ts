import { Component } from '@angular/core';
import { ModalController,Events } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { ComplaintSuggestion } from '../../../service/cs.service';

// import Component
import { NewAppreciationModal } from '../new/appreciation';
import { Configuration } from '../../../service/app.constants';
import { ComplaintPage } from '../../complaint/complaint';
import { PouchDbService } from "../../../service/pouchdbservice";

@Component({
  selector: 'your-appreciation',
  templateUrl: 'appreciation.html'
})

export class YourAppreciation extends ComplaintPage{

  // set header title
  title: string = "APPRECIATIONS";

  // used in event
  public master: string = "appreciation";
  public baseUrl: string;

  allData;
  currentPage = 1;
  EmptyAppreciations = false;

  constructor(public nl: CustomService,
              public con: Configuration,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion,
              public pouchdbservice:PouchDbService,
              public events:Events) {
    super(modalCtrl, nl, c,pouchdbservice,events);
     this.con.setUrlForAppreciations();
     this.getAllData("apreyour_");
    }
  ionViewWillEnter() {
    this.baseUrl = localStorage.getItem("fileUrl") + "/";
    this.con.setUrlForAppreciations();
  }

  ngOnInit() {
    //this.getAppreciations();
  }

  // getAppreciations() {
  //   this.nl.showLoader();
  //   /*this.getAllData("apreyour_");*/
  //   this.c.getComplaints(this.currentPage).subscribe((res) => {
  //     this.onSuccess(res);
  //   }, (err) => {
  //     this.nl.onError(err);
  //   });
  // }

  newAppreciation() {
    let createNew = this.modalCtrl.create(NewAppreciationModal);
    createNew.onDidDismiss((res) => {
      if (!res) { return; }
      this.showEmptyMsg(false);
      if (!this.allData) { this.allData = []; }
      this.allData.unshift(res);
    });
    createNew.present();
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

  onSuccess(res) {
    if (res.status === 204) {
      this.showEmptyMsg(true);
    } else {
      this.showEmptyMsg(false);
      this.allData = res;
    }
    this.nl.hideLoader();
  }

  showEmptyMsg(val) {
    this.EmptyAppreciations = val;
  }

}
