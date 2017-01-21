import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { CommentModal } from '../commentModal';

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

  onSuccess(res) {
    this.nl.hideLoader();
    let data = res.json();
    this.updateData(data);
  }

  onError() {
    this.nl.hideLoader();
    this.nl.errMessage();
  }

  updateData(data) {
    this.complaint.statusName = data.statusName;
    this.complaint.statusId = data.statusId;
    this.complaint.statusColor = data.statusColor;
  }

  complaintReopen(complaint, data) {
    this.nl.showLoader();
    this.c.reopenComplaint(complaint.id, data).subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError();
    });
  }

  complaintClose(complaint, reason) {
    this.nl.showLoader();
    this.c.closeComplaint(complaint.id, reason).subscribe((res) => {
      if (res) {
        this.onSuccess(res);
      }
    }, (err) => {
      this.onError();
    });
  }

  complaintSatisfy(complaint) {
    this.nl.showLoader();
    this.c.satisfiedComplaint(complaint.id).subscribe((res) => {
      if (res) {
        this.onSuccess(res);
      }
    }, (err) => {
      this.onError();
    });
  }

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
          this.complaintReopen(complaint, data);
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
      enableBackdropDismiss: false,
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
          if (data.comment === "") {
            this.nl.showToast("Please menation why you want to close complaint");
            return;
          }
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
          this.complaintClose(complaint, closeComplaintReason);
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
          this.complaintSatisfy(complaint);
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

  openCommentModal(complaint) {
    let Comment = this.modalCtrl.create(CommentModal, {complaint: complaint});
    Comment.present();
  }

}
