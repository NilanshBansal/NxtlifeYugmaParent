import { Component, Input } from '@angular/core';

import { Events } from 'ionic-angular';

@Component({
  selector: 'nl-close-button',
  template: `
  <div style="height:100%;">
    <button ion-button color="secondary" (click)="openCloseModal(complaint)" *ngIf="complaint.statusId != 6 && complaint.statusId != 4">
      <ion-icon name="md-close"></ion-icon>
      Close
    </button>
  </div>
  `
})

export class ListViewCloseButton {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public events: Events) { }

  openCloseModal(complaint) {
    console.log("DSADASD", this.masterName);
    this.events.publish(this.masterName + ':close', complaint);
  }
}
