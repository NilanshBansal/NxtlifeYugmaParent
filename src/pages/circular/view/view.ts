import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'circular-view',
  templateUrl: 'view.html'
})

export class ViewCircular {

  public circular = {};
  public baseUrl;

  public title: string = "View Circular";

  constructor(private navParams: NavParams) { }

  ionViewWillEnter() {
    this.baseUrl = localStorage.getItem("fileUrl") + "/";
    this.circular = this.navParams.get('circular');
  }

}