import { Component, Input } from '@angular/core';
import { CommentComplaintModal } from '../../pages/complaint/comment/comment.modal';
import { ModalController } from 'ionic-angular';

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

  constructor(public modalCtrl: ModalController) { }

  openCommentModal(complaint) {
    let Comment = this.modalCtrl.create(CommentComplaintModal, {complaint: complaint});
    Comment.present();
  }
}
