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

@Component({
  selector: 'suggestion-for-you',
  templateUrl: 'suggestion.html'
})

export class SuggestionForYou extends ComplaintPage {

  // set header title
  title: string = "Suggestions For You";

  // used in event
  public master: string = "suggestion";

  constructor(public nl: CustomService,
              public events: Events,
              public con: Configuration,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion) {
    super(modalCtrl, alertCtrl, events, nl, c, actionSheetCtrl);
    this.con.setUrlForStudentSuggestions("for-student");
    this.getComplaints();
  }

  ionViewWillEnter() {
    this.con.setUrlForStudentSuggestions("for-student");
  }

}
