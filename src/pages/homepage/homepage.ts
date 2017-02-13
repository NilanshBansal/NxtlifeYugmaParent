import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PollPage } from '../poll/poll';
import { SuggestionTabs } from '../suggestion/suggestionTabs';
import { AppreciationTabs } from '../appreciation/appreciationTabs';
import { StudentRating} from '../rating/rating';
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

  title: string = "Dashboard";

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
    this.navCtrl.setRoot(SuggestionTabs);
  }

  openAppreciation() {
    this.configuration.setUrl("appreciation");
    this.navCtrl.setRoot(AppreciationTabs);
  }

  openSurvey() {
    this.navCtrl.setRoot(SurveyPage);
  }

  openRating() {
    this.configuration.setUrl("student-profile");
    this.navCtrl.setRoot(StudentRating);
  }

}
