import { Component, Input } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

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

export class ListViewSatisfiedButton {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) { }

  openSatisfiedModal(complaint): void {
    let prompt = this.alertCtrl.create({
      title: 'Complaint Satisfied ?',
      message: "If you are happy with the complaint resolution then click on satisfied button",
      buttons: [{
        text: 'Cancel',
        handler: data => {
        }
      }, {
        text: 'Satisfied!!',
        handler: data => {
          this.satisfiedActionSheet(complaint);
        }
      }]
    });
    prompt.present();
  }

  satisfiedActionSheet(complaint) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.nl.showLoader();
          this.c.satisfiedComplaint(complaint.id).subscribe((res) => {
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
      },{
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    actionSheet.present();
  }
}
