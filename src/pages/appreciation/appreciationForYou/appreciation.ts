import { Component } from '@angular/core';
import { ModalController,
         AlertController,
         PopoverController,
         ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { Configuration } from '../../../service/app.constants';

// import Component
import { ComplaintPage } from '../../complaint/complaint';

@Component({
  selector: 'appreciation-for-you',
  templateUrl: 'appreciation.html'
})

export class AppreciationForYou extends ComplaintPage {

  // set header title
  title: string = "APPRECIATIONS";

  // used in event
  public master: string = "appreciation";

  constructor(public nl: CustomService,
              public con: Configuration,
              public modalCtrl: ModalController,
              public c: ComplaintSuggestion) {
    super(modalCtrl, nl, c);
    this.con.setUrlForStudentAppreciations("for-student");
    this.getAllData();
  }

  ionViewWillEnter() {
    this.con.setUrlForStudentAppreciations("for-student");
  }

}
