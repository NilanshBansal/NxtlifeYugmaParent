import { Component } from '@angular/core';
import { CircularService } from './../../service/circular.service';
import { ViewCircular } from './view/view';
import { ModalController } from 'ionic-angular';
import { CustomService } from './../../service/custom.service';

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
              private nl: CustomService) { }

  ionViewWillEnter() {
    this.getCirculars();
  }

  public getCirculars() {
    this.nl.showLoader();
    this.circularService.getAllCirculars(1).subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
    });
  }

  public viewCircular(id) {
    this.nl.showLoader();
    this.circularService.getParticularCirculars(id).subscribe((res) => {
      this.nl.hideLoader();
      let createNew = this.modalCtrl.create(ViewCircular, { circular: res });
      createNew.present();
    }, (err) => {
      this.onError(err);
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
  }

  public loadDataError(err) {
    this.currentPage -= 1;
    this.EmptyCirculars = false;
    this.nl.onError(err);
  }

}