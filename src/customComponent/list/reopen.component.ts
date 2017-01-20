import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

export class EditComplaintStatusAndComment {

  complaint;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) { }

  openReopenModal(complaint): void {
    this.complaint = complaint;
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
