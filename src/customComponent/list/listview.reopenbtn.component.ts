import { Component, Input } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { Reopen } from './reopen.component';
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

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

export class ListViewReopenButton extends Reopen  {

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
