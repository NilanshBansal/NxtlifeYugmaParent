import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';

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

export class ListViewCloseButton {

  @Input() complaint;
  @Input('master') masterName: string;
  @Output() closeCmpl = new EventEmitter();

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) { }

  openCloseModal(complaint) {
    let prompt = this.alertCtrl.create({
      title: 'Do you really want to close ?',
      message: "",
      inputs: [{
        name: 'comment',
        placeholder: 'Write short description'
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {}
      }, {
        text: 'Save',
        handler: data => {
          this.closeActionSheet(complaint, data);
        }
      }]
    });
    prompt.present();
  }

  closeActionSheet(complaint, closeComplaintReason) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.nl.showLoader();
          this.c.closeComplaint(complaint.id, closeComplaintReason).subscribe((res) => {
            if (res) {
              this.nl.hideLoader();
              let data = res.json();
              this.complaint.statusName = data.statusName;
              this.complaint.statusId = data.statusId;
              this.complaint.statusColor = data.statusColor;
            }
          }, (err) => {
            this.nl.hideLoader();
            this.nl.errMessage();
          });
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    actionSheet.present();
  }

}
