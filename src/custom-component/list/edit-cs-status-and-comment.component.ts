import { Component, Input } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { EditComplaintStatusAndComment } from './edit-cs-status-and-comment.class';

// import service
import { CustomService } from '../../service/custom.service';
import { ComplaintSuggestion } from '../../service/cs.service';

@Component({
  selector: 'nl-close-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="secondary" (click)="openCloseModal(complaint)" *ngIf="complaint.statusId != 6 && complaint.statusId != 4">
        <ion-icon name="md-close" class="csBigIcon"></ion-icon>
        Close
      </button>
    </div>
  `
})

export class ListViewCloseButton extends EditComplaintStatusAndComment {

  @Input() complaint;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}

@Component({
  selector: 'nl-reopen-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="danger" (click)="openReopenModal(complaint)" *ngIf="complaint.statusId === 4">
        <ion-icon name="ios-thumbs-down" class="csBigIcon"></ion-icon>
        Reopen
      </button>
    </div>
  `
})

export class ListViewReopenButton extends EditComplaintStatusAndComment  {

  @Input() complaint;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}

@Component({
  selector: 'nl-satisfied-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="primary" (click)="openSatisfiedModal(complaint)" *ngIf="complaint.statusId === 4">
        <ion-icon name="ios-thumbs-up" class="csBigIcon"></ion-icon>
        Satisfied
      </button>
    </div>
  `
})

export class ListViewSatisfiedButton extends EditComplaintStatusAndComment {

  @Input() complaint;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}

@Component({
  selector: 'nl-comment-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="cool" (click)="openCommentModal(complaint)">
        <ion-icon name="ios-chatbubbles" class="csBigIcon"></ion-icon>
        Comments
      </button>
    </div>
  `
})

export class ListViewCommentButton extends EditComplaintStatusAndComment {

  @Input() complaint;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}
