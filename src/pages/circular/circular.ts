import { Component } from '@angular/core';
import { CircularService } from './../../service/circular.servce';
import { ViewCircular } from './view/view';
import { NavController } from 'ionic-angular';
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

  constructor(private circularService: CircularService,
              private navCtrl: NavController,
              private nl: CustomService) { }

  ionViewWillEnter() {
    this.getCirculars();
  }

  public getCirculars() {
    this.nl.showLoader();
    this.circularService.getAllCirculars().subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
    });
  }

  public viewCircular(id) {
    this.navCtrl.push(ViewCircular, {
      id: id
    });
  }

  public doRefresh(refresher) {
    setTimeout(() => {
      this.circularService.getAllCirculars().subscribe((res) => {
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

}