import { Component, Input } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';
import { EditComplaintStatusAndComment } from './reopen.component';

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
