import { Component, OnInit } from '@angular/core';
import { CircularService } from './../../service/circular.servce';
import { CircularViewComponent } from './view/circular-view';
import { NavController, NavParams } from 'ionic-angular';
import { CustomService } from './../../service/custom.service';

@Component({
  selector: 'circular-parent',
  templateUrl: 'circular.html'
})

export class Circular implements OnInit {

  public circulars = [];
  public title: string = "Circular";
  public allData = [];
  public EmptyPolls: boolean = false;

  constructor(private circserv: CircularService,
              private navCtrl: NavController,
              private navparams: NavParams,
              private nl: CustomService) { }

  ngOnInit(): void {
    this.AllCirculars();
  }

  AllCirculars() {
    this.nl.showLoader();
    this.circserv.getAllCirculars()
        .subscribe(response => { this.nl.hideLoader(); this.circulars = response; },
        err => { this.nl.hideLoader(); console.error(err); },
        () => console.log('circular response', this.circulars)
        )
  }

  ranFunc(id) {
    this.navCtrl.push(CircularViewComponent, {
      id: id
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.circserv.getAllCirculars().subscribe((res) => {
        this.onSuccess(res);
        refresher.complete();
      }, (err) => {
        refresher.complete();
        this.onError(err);
      });
    }, 500);
  }

  onSuccess(res) {
    this.nl.hideLoader();
    if (res.status === 204) {
      this.EmptyPolls = true;
    } else {
      this.EmptyPolls = false;
      this.allData = res;
    }
  }

  onError(err) {
    this.nl.onError(err);
  }

}