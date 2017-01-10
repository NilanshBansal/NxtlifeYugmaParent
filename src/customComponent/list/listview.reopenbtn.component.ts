import { Component, Input } from '@angular/core';

import { Events } from 'ionic-angular';

@Component({
  selector: 'nl-reopen-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="danger" (click)="openReopenModal(complaint)" *ngIf="complaint.statusId === 4">
        <ion-icon name="ios-thumbs-down"></ion-icon>
        Reopen
      </button>
    </div>
  `
})

export class ListViewReopenButton {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public events: Events) { }

  openReopenModal(complaint) {
    console.log("DSADASD", this.masterName);
    this.events.publish(this.masterName + ':reopen', complaint);
  }
}
