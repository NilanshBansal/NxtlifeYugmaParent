import { Component } from '@angular/core';
import { ModalController,Events } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { Configuration } from '../../../service/app.constants';

// import Component
import { ComplaintPage } from '../../complaint/complaint';

//pouchdb service
import { PouchDbService } from '../../../service/pouchdbservice';

@Component({
  selector: 'appreciation-for-you',
  templateUrl: 'appreciation.html'
})

export class AppreciationForYou extends ComplaintPage {

  // set header title
  title: string = "APPRECIATIONS";

  // used in event
  public master: string = "appreciation";
  public baseUrl: string;

  constructor(public nl: CustomService,
              public con: Configuration,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion,
              public pouchdbservice:PouchDbService,
              public events:Events) {
    super(modalCtrl, nl, c,pouchdbservice,events);
    this.con.setUrlForStudentAppreciations("for-student");
    this.getAllData("apre4u_");
  }

  ionViewWillEnter() {
    this.baseUrl = localStorage.getItem("fileUrl") + "/";
    this.con.setUrlForStudentAppreciations("for-student");
  }

}
