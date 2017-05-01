import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { CommentModal } from '../commentModal';

// import service
import { CustomService } from '../../service/custom.service';
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
    this.updateData(res);
  }

  onError(err) {
    this.nl.onError(err);
  }

  updateData(data) {
    console.log("data", data);
    this.complaint.statusName = data.statusName;
    this.complaint.statusId = data.statusId;
    this.complaint.statusColor = data.statusColor;
    this.complaint.commentCount = data.commentCount;
  }

  complaintReopen(complaint, data) {
    this.nl.showLoader();
    if (complaint.anonymous) {
      data["anonymous"] = true;
    } else {
      data["anonymous"] = false;
    }
    this.c.reopenComplaint(complaint.id, data).subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
    });
  }

  complaintClose(complaint, reason) {
    this.nl.showLoader();
    if (complaint.anonymous) {
      reason["anonymous"] = true;
    } else {
      reason["anonymous"] = false;
    }
    this.c.closeComplaint(complaint.id, reason).subscribe((res) => {
      if (res) {
        this.onSuccess(res);
      }
    }, (err) => {
      this.onError(err);
    });
  }

  complaintSatisfy(complaint) {
    this.nl.showLoader();
    this.c.satisfiedComplaint(complaint.id).subscribe((res) => {
      if (res) {
        this.onSuccess(res);
      }
    }, (err) => {
      this.onError(err);
    });
  }

  openReopenModal(complaint): void {
    this.complaint = complaint;
    let prompt = this.alertCtrl.create({
      title: 'If you are not happy with the resolution then reopen',
      message: "",
      inputs: [{
        name: 'comment',
        placeholder: 'Write short description'
      }],
      buttons: [{
        text: 'Cancel',
        handler: (data) => {}
      }, {
        text: 'Reopen It!!',
        handler: (data) => {
          if (data.comment === "") {
            this.nl.showToast("write any comment to close");
            return;
          }
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
        text: 'No',
        handler: data => {}
      }, {
        text: 'Yes',
        handler: (data) => {
          if (data.comment === "") {
            this.nl.showToast("write any comment to close");
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
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you Satisfied ?',
      buttons: [{
        text: 'YES',
        icon: 'ios-paper-outline',
        handler: () => {
          this.satisfiedActionSheet(complaint);
        }
      }, {
        text: 'CANCEL',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    actionSheet.present();
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
    this.nl.showLoader();
    this.c.getComments(complaint.id).subscribe((response) => {
      this.nl.hideLoader();
      let Comment = this.modalCtrl.create(CommentModal, {comments: response, data: complaint});
      Comment.present();
    }, (err) => {
      this.nl.onError(err);
    });
  }

}
