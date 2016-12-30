import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PollPage } from '../poll/poll';
import { SuggestionPage } from '../suggestion/suggestion';
import { AppreciationPage } from '../appreciation/appreciation';
import { ReportIssuePage} from '../reportIssue/reportIssue';
import { SurveyPage} from '../survey/survey';
import { ComplaintPage} from '../complaint/complaint';

import { MenuController } from 'ionic-angular';

import { Configuration } from '../../service/app.constants';
import { PlannerComponent } from '../planner/planner.component';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'homepage.html'
})

export class Dashboard {

  constructor(public menuCtrl: MenuController,
              public configuration: Configuration,
              private navCtrl: NavController) {
      this.menuCtrl.enable(true);
  }

  openComplaint() {
    this.configuration.setUrl("complaint");
    this.navCtrl.setRoot(ComplaintPage);
  }

  openPlanner() {
    this.navCtrl.setRoot(PlannerComponent);
  }

  openPoll() {
    this.navCtrl.setRoot(PollPage);
  }

  openSuggestion() {
    this.configuration.setUrl("suggestion");
    this.navCtrl.setRoot(SuggestionPage);
  }

  openAppreciation() {
    this.navCtrl.setRoot(AppreciationPage);
  }

  openSurvey() {
    this.navCtrl.setRoot(SurveyPage);
  }

  openReportIssue() {
    this.navCtrl.setRoot(ReportIssuePage);
  }

}
