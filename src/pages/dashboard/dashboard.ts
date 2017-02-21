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
import { HomeworkComponent } from '../homework/homework.component';
import { CircularComponent } from '../circular/circular.component';
import { SurveyListPage } from '../survey/list/survey-list';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class Dashboard {

  title: string = "Dashboard";

  constructor(public menuCtrl: MenuController,
              public configuration: Configuration,
              private navCtrl: NavController) {
      this.menuCtrl.enable(true);
  }

  page = {
    complaint: ComplaintPage,
    suggestion: SuggestionTabs,
    planner: PlannerComponent,
    appreciation: AppreciationTabs,
    rating: StudentRating,
    poll: PollPage,
    homework: HomeworkComponent,
    circular: CircularComponent,
    survey: SurveyListPage
  }

  openPage(componentName, urlName) {
    this.configuration.setUrl(urlName);
    this.navCtrl.setRoot(componentName);
  }

}
