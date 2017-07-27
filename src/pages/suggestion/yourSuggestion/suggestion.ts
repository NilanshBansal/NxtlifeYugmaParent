import { Component } from '@angular/core';
import { ModalController, Events } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { Configuration } from '../../../service/app.constants';

// import Component
import { ComplaintPage } from '../../complaint/complaint';

//pouchdb service
import { PouchDbService } from '../../../service/pouchdbservice';


@Component({
  selector: 'your-suggestion',
  templateUrl: 'suggestion.html'
})

export class YourSuggestion extends ComplaintPage {

  // set header title
  title: string = "SUGGESTIONS";

  // used in event
  public master: string = "suggestion";

  constructor(public nl: CustomService,
              public con: Configuration,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion,
              public pouchdbservice:PouchDbService,
              public events:Events) {
    super(modalCtrl, nl, c,pouchdbservice,events);
    this.getAllData("sgsyour_");
  }

  ionViewWillEnter() {
    this.con.setUrlForSuggestion();
  }

}
