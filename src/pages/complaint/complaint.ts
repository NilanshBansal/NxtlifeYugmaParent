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
    this.c.getComplaints(this.currentPage).subscribe((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res;
      }
      this.nl.hideLoader();
    }, (err) => {
      this.nl.onError(err);
    });
  }

  newComplaint(): void {
    let newComplaint = this.modalCtrl.create(newComplaintModal);
    newComplaint.onDidDismiss((newComplaint) => {
      console.log("DSa", newComplaint)
      if (!newComplaint) { return; }
      if (!this.complaints) { this.complaints = []; }
      this.EmptyComplaints = false;
      this.complaints.unshift(newComplaint);
    });
    newComplaint.present();
  }

  viewComplaint(viewData): void {
    let viewComplaint = this.modalCtrl.create(ViewComponent, {complaint: viewData});
    viewComplaint.present();
  }

  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.c.getComplaints(this.currentPage).subscribe((res) => {
        if (res.status === 204) {
          this.currentPage -= 1;
          infiniteScroll.complete();
          return;
        }
        this.complaints = this.complaints.concat(res);
      }, (err) => {
        this.currentPage -= 1;
        this.EmptyComplaints = false;
        this.nl.onError(err);
      });
      infiniteScroll.complete();
    }, 1000);
  }

  doRefresh(refresher) {
    this.currentPage = 1;
    setTimeout(() => {
      this.c.getComplaints(this.currentPage).subscribe((res) => {
        if (res.status === 204) {
          this.EmptyComplaints = true;
          this.currentPage -= 1;
        } else {
          this.EmptyComplaints = false;
          this.complaints = res;
        }
      }, (err) => {
        this.nl.onError(err);
      });
      refresher.complete();
    }, 1000);
  }

}
