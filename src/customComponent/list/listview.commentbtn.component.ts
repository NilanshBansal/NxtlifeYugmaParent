import { Component, Input } from '@angular/core';

import { Events } from 'ionic-angular';

@Component({
  selector: 'nl-comment-button',
  template: `
    <div style="height:100%;">
      <button style="font-size:30px;" ion-button color="secondary" (click)="openCommentModal(complaint)">
        <ion-icon name="ios-chatbubbles"></ion-icon>
      </button>
    </div>
  `
})

export class ListViewCommentButton {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public events: Events) { }

  openCommentModal(complaint) {
    console.log("DSADASD", this.masterName);
    this.events.publish(this.masterName + ':comment', complaint);
  }
}
