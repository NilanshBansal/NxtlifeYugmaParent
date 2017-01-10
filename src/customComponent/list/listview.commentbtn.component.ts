import { Component, Input } from '@angular/core';

import { Events } from 'ionic-angular';

@Component({
  selector: 'nl-comment-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="cool" (click)="openCommentModal(complaint)">
        <ion-icon name="ios-chatbubbles"></ion-icon>
        Comments
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
