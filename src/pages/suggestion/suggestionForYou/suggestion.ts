import { Component } from '@angular/core';
import { ModalController, Events } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { Configuration } from '../../../service/app.constants';

// import Component
import { ComplaintPage } from '../../complaint/complaint';

//import pouchdb service
import { PouchDbService } from '../../../service/pouchdbservice';

@Component({
  selector: 'suggestion-for-you',
  templateUrl: 'suggestion.html'
})

export class SuggestionForYou extends ComplaintPage {

  // set header title
  title: string = "SUGGESTIONS";

  // used in event
  public master: string = "suggestion";
  public baseUrl;

  constructor(public nl: CustomService,
              public con: Configuration,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion,
              public pouchdbservice:PouchDbService,
              public events:Events) {
    super(modalCtrl, nl, c,pouchdbservice,events);
    this.con.setUrlForStudentSuggestions("for-student");
    this.getAllData("sgs4u_");
  }

  ionViewWillEnter() {
    this.baseUrl = localStorage.getItem("fileUrl") + "/";
    this.con.setUrlForStudentSuggestions("for-student");
  }

}
