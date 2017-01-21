import { Component } from '@angular/core';
import { ModalController,
         AlertController,
         ActionSheetController,
         ItemSliding } from 'ionic-angular';

// import modal
import { newComplaintModal } from './new/newComplaintModal';
import { ViewComponent } from './view/viewComplaintModal';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'complaint.html'
})

export class ComplaintPage {

  complaints = [];
  EmptyComplaints = false;
  currentPage: number = 1;

  // set header title
  title: string = "COMPLAINTS";

  // used in event
  public master: string = "complaint";

  constructor(public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController) {

  }

  ionViewWillEnter() {
    this.getComplaints();
  }

  getComplaints() {
    this.nl.showLoader();
    this.c.getComplaints(this.currentPage).subscribe((complaints) => {
      if (complaints.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = complaints.json();
      }
      this.nl.hideLoader();
    }, err => {
      this.nl.errMessage();
      this.nl.hideLoader();
    });
  }

  newComplaint(): void {
    let newComplaint = this.modalCtrl.create(newComplaintModal);
    newComplaint.onDidDismiss((newComplaint) => {
      console.log("DSa", newComplaint)
      if (!newComplaint) { return; }
      if (this.complaints && this.complaints.length != 0) {
        this.EmptyComplaints = false;
        this.complaints.unshift(newComplaint);
      } else {
        this.EmptyComplaints = false;
        this.complaints.unshift(newComplaint);
      }
    });
    newComplaint.present();
  }

  viewComplaint(complaint): void {
    let viewComplaint = this.modalCtrl.create(ViewComponent, {complaint: complaint});
    viewComplaint.present();
  }

  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.c.getComplaints(this.currentPage).subscribe(response => {
        if (response.status === 204) {
          this.currentPage -= 1;
          infiniteScroll.complete();
          infiniteScroll.enable(false);
          return;
        }
        this.complaints = this.complaints.concat(response.json());
      }, (err) => {
        this.currentPage -= 1;
        this.EmptyComplaints = false;
      });
      infiniteScroll.complete();
    }, 1000);
  }

  doRefresh(refresher) {
    this.currentPage = 1;
    setTimeout(() => {
      this.c.getComplaints(this.currentPage).subscribe(response => {
        if (response.status === 204) {
          this.EmptyComplaints = true;
          this.currentPage -= 1;
        } else {
          this.EmptyComplaints = false;
          this.complaints = response.json();
        }
      });
      refresher.complete();
    }, 1000);
  }

}
