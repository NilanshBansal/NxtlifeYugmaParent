import { Component } from '@angular/core';
import { ModalController,
         AlertController,
         PopoverController,
         ActionSheetController,
         Events } from 'ionic-angular';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

// import modal
import { newSuggestionModal } from './new/newSuggestionModal';

// import Component
import { ComplaintPage } from '../complaint/complaint';

@Component({
  selector: 'page-map',
  templateUrl: 'suggestion.html'
})

export class SuggestionPage extends ComplaintPage {

  // set header title
  title: string = "Suggestions";

  // used in event
  public master: string = "suggestion";

  constructor(public nl: CustomService,
              public events: Events,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion) {
    super(modalCtrl, alertCtrl, events, nl, c, actionSheetCtrl);
  }

  ionViewWillEnter() {
    this.getComplaints();
  }

  // Respond after Angular projects external content into the component's view.
  // Called once after the first NgDoCheck
  ngAfterContentInit() {
    this.events.subscribe('suggestion:comment', (data) => {
      this.openCommentModal(data[0]);
    });
    this.events.subscribe('suggestion:close', (data) => {
      this.openCloseModal(data[0]);
    });
    this.events.subscribe('suggestion:reopen', (data) => {
      this.openReopenModal(data[0]);
    });
    this.events.subscribe('suggestion:satisfied', (data) => {
      this.openSatisfiedModal(data[0]);
    });
  }

}
