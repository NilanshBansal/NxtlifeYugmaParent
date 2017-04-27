import { Component } from '@angular/core';
import { CircularService } from '../../../service/circular.servce';
import { NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'circular-view',
  templateUrl: 'view.html'
})

export class ViewCircular {

  id;
  circular = {};
  public title: string = "View Circular";

  constructor(private circserv: CircularService,
              private navParams: NavParams) {
    
  }

  ionViewWillEnter() {
    this.circular = this.navParams.get('circular');
  }

}