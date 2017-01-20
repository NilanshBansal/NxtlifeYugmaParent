import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'view-complaint-modal',
  templateUrl: 'viewComplaintModal.html'
})

export class viewComplaintModal {

  complaint;

  title = "VIEW COMPLAINT";

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController) {

  }

  ngOnInit() {
    this.complaint = this.navParams.get('complaint');
    console.log("complaint", this.complaint);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
