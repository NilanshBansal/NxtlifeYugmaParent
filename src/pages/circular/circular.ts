import { Component } from '@angular/core';
import { CircularService } from './../../service/circular.service';
import { ViewCircular } from './view/view';
import { ModalController } from 'ionic-angular';
import { CustomService } from './../../service/custom.service';
import { PouchDbService } from "../../service/pouchdbservice";

@Component({
  selector: 'circular-parent',
  templateUrl: 'circular.html'
})

export class Circular {

  public circulars = [];
  public title: string = "Circular";
  public allData = [];
  public EmptyCirculars: boolean = false;
  public currentPage = 1;

  constructor(private circularService: CircularService,
              private modalCtrl: ModalController,
              private nl: CustomService,
              public pouchdbservice:PouchDbService) { }

  ionViewWillEnter() {
    this.getCirculars();
  }

  public getCirculars() {
    this.nl.showLoader();
    this.circularService.getAllCirculars(1).subscribe((res) => {
      this.onSuccess(res);
      this.pouchdbservice.add(res,"cir_");      
    }, (err) => {
      this.onError(err);
      let that =this;
      this.pouchdbservice.getAllComplaints("cir_").then(function(result){
        that.circulars=result;
      });
    });
  }

  public viewCircular(id) {
    let that=this;
    this.nl.showLoader();
    this.circularService.getParticularCirculars(id).subscribe((res) => {
      this.nl.hideLoader();
      this.pouchdbservice.addSingleWithDelete(res, "cirview_",res["id"]);
      console.log("see : ",res);
      let createNew = this.modalCtrl.create(ViewCircular, { circular: res });
      createNew.present();
    }, (err) => {
      this.onError(err);
      this.pouchdbservice.findDoc(id, "cirview_").then(function (result) {
        console.log("see :",result);
        let createNew = that.modalCtrl.create(ViewCircular, { circular: result });
      createNew.present();
      });
    });
  }

  public doRefresh(refresher) {
    setTimeout(() => {
      this.circularService.getAllCirculars(1).subscribe((res) => {
        this.onSuccess(res);
        refresher.complete();
      }, (err) => {
        refresher.complete();
        this.onError(err);
      });
    });
  }

  public onSuccess(res) {
    this.nl.hideLoader();
    if (res.status === 204) {
      this.EmptyCirculars = true;
    } else {
      this.EmptyCirculars = false;
      this.circulars = res;
    }
  }

  public onError(err) {
    this.nl.onError(err);
  }

  public doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.loadMoreData(infiniteScroll);
    }, 500);
  }

  public loadMoreData(infiniteScroll) {
    this.circularService.getAllCirculars(this.currentPage).subscribe((res) => {
      infiniteScroll.complete();
      this.loadDataSuccess(res);
    }, (err) => {
      infiniteScroll.complete();
      this.loadDataError(err);
    });
  }

  public loadDataSuccess(res) {
    if (res.status === 204) {
      this.currentPage -= 1;
      return;
    }
    this.circulars = this.circulars.concat(res);
    this.pouchdbservice.addWithoutDelete(res,"cir_");
  }

  public loadDataError(err) {
    this.currentPage -= 1;
    this.EmptyCirculars = false;
    this.nl.onError(err);
  }

}