import { Component } from '@angular/core';
import { NavController, ModalController, App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { PollPage } from '../poll/poll';
import { SuggestionTabs } from '../suggestion/suggestionTabs';
import { AppreciationTabs } from '../appreciation/appreciationTabs';
import { StudentRating} from '../rating/rating';
import { SurveyPage} from '../survey/survey';
import { ComplaintPage} from '../complaint/complaint';
import { Configuration } from '../../service/app.constants';
import { PlannerComponent } from '../planner/planner.component';
import { HomeworkTabs } from '../homework/homeworkTabs';
import { CircularComponent } from '../circular/circular.component';
import { SurveyListPage } from '../survey/list/survey-list';
import { EventModalPage } from '../planner/view/planner-view';

import { ComplaintSuggestion } from '../../service/cs.service';
import { CustomService } from '../../service/custom.service';
import { EventService } from '../../service/planner.service';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styles: [`
    ion-toolbar div {
      background:transparent !important;
    }
  `]
})

export class Dashboard {

  title: string = "Dashboard";
  public planner;
  public openPoll;
  public surveys;

  constructor(public menuCtrl: MenuController,
              public configuration: Configuration,
              public cs: ComplaintSuggestion,
              public nl: CustomService,
              public appCtrl: App,
              private surveyService : SurveyService ,
              public modalCtrl: ModalController,
              public eventService: EventService,
              private navCtrl: NavController) {
    this.menuCtrl.enable(true);
    this.configuration.setUrl("dashboard");
  }

  public page = {
    complaint: ComplaintPage,
    suggestion: SuggestionTabs,
    planner: PlannerComponent,
    appreciation: AppreciationTabs,
    rating: StudentRating,
    poll: PollPage,
    homework: HomeworkTabs,
    circular: CircularComponent,
    survey: SurveyListPage
  }

  openPage(componentName, urlName) {
    this.configuration.setUrl(urlName);
    this.navCtrl.setRoot(componentName);
  }

  ionViewWillEnter() {
    this.getDashboardData();
  }

  getDashboardData() {
    this.nl.showLoader();
    this.cs.getDashboardData().subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
    });
  }

  onSuccess(data) {
    this.nl.hideLoader();
    this.planner = data.planner;
    this.openPoll = data.poll;
    this.surveys = data.survey;
    console.log(data)
  }

  onError(err) {
    this.nl.onError(err);
  }

  GoToEvent(eventId) {
    this.nl.showLoader();
    this.configuration.setUrl("planner");
    this.eventService.GetParticularEvent(eventId).subscribe((res) => {
      this.nl.hideLoader();
      let modal3 = this.modalCtrl.create(EventModalPage,{
        eventsss : res
      });
      modal3.present();
    }, (err) => {
      this.nl.hideLoader();
      console.log("EE", err);
    })
  }

  goToPoll() {
    this.configuration.setUrl("poll");
    this.appCtrl.getRootNav().setRoot(PollPage);
  }

  goToSurvey(surveyId) {
    this.configuration.setUrl("survey");
    this.surveyService.getOneSurvey(surveyId).subscribe((res) => {
      this.navCtrl.push(SurveyPage,{
        objj : res
      });
    }, (err) => {
      console.log("Err", err);
    });
  }

}
