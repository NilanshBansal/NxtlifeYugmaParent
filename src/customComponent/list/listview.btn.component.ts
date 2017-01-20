import { Component, Input } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { EditComplaintStatusAndComment } from './listview.btn.class';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

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

export class ListViewCloseButton extends EditComplaintStatusAndComment {

  @Input() complaint;
  @Input('master') masterName: string;

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
        <ion-icon name="ios-thumbs-down"></ion-icon>
        Reopen
      </button>
    </div>
  `
})

export class ListViewReopenButton extends EditComplaintStatusAndComment  {

  @Input() complaint;
  @Input('master') masterName: string;

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
        <ion-icon name="ios-thumbs-up"></ion-icon>
        Satisfied
      </button>
    </div>
  `
})

export class ListViewSatisfiedButton extends EditComplaintStatusAndComment {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}

@Component({
  selector: 'nl-view',
  templateUrl: 'view.component.html'
})

export class ViewComponent extends EditComplaintStatusAndComment {

  @Input() complaint: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}
