import { Component, Input } from '@angular/core';

import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';

// import service
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

export class ListViewReopenButton {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) { }

  openReopenModal(complaint): void {
    let prompt = this.alertCtrl.create({
      title: 'If you are not happy with the complaint resolution then reopen complaint',
      message: "",
      inputs: [{
        name: 'comment',
        placeholder: 'Write short description'
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {}
      }, {
        text: 'Reopen!!',
        handler: data => {
          this.reopenActionSheet(complaint, data);
        }
      }]
    });
    prompt.present();
  }

  reopenActionSheet(complaint, data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.nl.showLoader();
          this.c.reopenComplaint(complaint.id, data).subscribe((res) => {
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
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }
}
