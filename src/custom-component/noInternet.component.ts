import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

declare var someGlobal;

@Component({
  selector: 'no-internet',
  template: `
    <ion-header>
      <nl-navbar [title]="title"></nl-navbar>
    </ion-header>
    <ion-content class="homeBackground csGrayBackground">
      <h3>You are currently offline</h3>
    </ion-content>
  `
})

export class NoInternet {

  title: string = "No Internet";

  constructor(public menuCtrl: MenuController,
              private navCtrl: NavController) {
      this.menuCtrl.enable(false);
  }

}
