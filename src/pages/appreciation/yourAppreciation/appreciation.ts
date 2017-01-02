import { Component } from '@angular/core';
import { ModalController,
         AlertController,
         PopoverController,
         ActionSheetController,
         Events } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/customService';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { Configuration } from '../../../service/app.constants';

// import Component
import { ComplaintPage } from '../../complaint/complaint';
import { NewAppreciationModal } from '../new/appreciation';

@Component({
  selector: 'your-appreciation',
  templateUrl: 'appreciation.html'
})

export class YourAppreciation {

  // set header title
  title: string = "Appreciations";

  // used in event
  public master: string = "appreciation";

  appreciations;
  EmptyAppreciations = false;

  constructor(public nl: CustomService,
              public events: Events,
              public con: Configuration,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion) {
    // super(modalCtrl, alertCtrl, events, nl, c, actionSheetCtrl);
  }

  ngOnInit() {
    this.getAppreciations();
  }

  currentPage = 0;

  getAppreciations() {
    this.nl.showLoader();
    this.c.getComplaints(this.currentPage).subscribe((appreciations) => {
      if (appreciations.status === 204) {
        this.EmptyAppreciations = true;
      } else {
        this.EmptyAppreciations = false;
        this.appreciations = appreciations.json();
      }
      this.nl.hideLoader();
    }, err => {
      this.nl.errMessage();
      this.nl.hideLoader();
    });
  }

  loadNewAppreciations(refresher) {
    this.currentPage = 1;
    setTimeout(() => {
      this.c.getComplaints(this.currentPage).subscribe(response => {
        if (response.status === 204) {
          this.EmptyAppreciations = true;
          this.currentPage -= 1;
        } else {
          this.EmptyAppreciations = false;
          this.appreciations = response.json();
        }
      });
      refresher.complete();
    }, 1000);
  }

  newAppreciation() {
    let appreciateModal = this.modalCtrl.create(NewAppreciationModal);
    appreciateModal.onDidDismiss((res) => {
      if (!res) { return; }
      this.EmptyAppreciations = false;
      this.appreciations.unshift(res);
    });
    appreciateModal.present();
  }

}
