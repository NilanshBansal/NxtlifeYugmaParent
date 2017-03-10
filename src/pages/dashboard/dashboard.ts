import { Component } from '@angular/core';
import { NavController, ModalController, App, Events } from 'ionic-angular';
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
import { CircularViewComponent } from '../circular/view/circular-view';

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
  public planner = [];
  public openPoll = [];
  public surveys = [];
  public circular = [];
  public surveyCount;
  public pollCount;
  public hasData: boolean = false;

  constructor(public menuCtrl: MenuController,
              public configuration: Configuration,
              public cs: ComplaintSuggestion,
              public nl: CustomService,
              public appCtrl: App,
              public events: Events,
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
    this.cs.getDashboardData().subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
      this.hasData = true;
    });
  }

  onSuccess(data) {
    this.hasData = true;
    this.planner = data.planner;
    this.openPoll = data.poll;
    this.surveys = data.survey;
    this.circular = data.circular;
    this.surveyCount = data.surveyCount;
    this.pollCount = data.pollCount;
    console.log(data)
  }

  onError(err) {
    if (err == 401 || err == 0) {
      this.events.publish("session:expired");
    }
    this.nl.showToast(err);
  }

  GoToEvent(eventId) {
    this.nl.showLoader();
    this.configuration.setUrl("planner");
    this.eventService.GetParticularEvent(eventId).subscribe((res) => {
      this.nl.hideLoader();
      this.openModal(res);
    }, (err) => {
      this.nl.hideLoader();
      this.nl.onError(err);
    });
  }

  openModal(data) {
    let modal = this.modalCtrl.create(EventModalPage, { eventsss : data });
    modal.present();
  }

  goToPoll() {
    this.configuration.setUrl("poll");
    this.appCtrl.getRootNav().setRoot(PollPage);
  }

  goToSurvey(surveyId) {
    this.nl.showLoader();
    this.configuration.setUrl("survey");
    this.surveyService.getOneSurvey(surveyId).subscribe((res) => {
      this.nl.hideLoader();
      this.navCtrl.push(SurveyPage,{
        objj : res
      });
    }, (err) => {
      this.nl.hideLoader();
      this.nl.onError(err);
    });
  }

  goToCircular(circularId) {
    // this.nl.showLoader();
    this.configuration.setUrl("circular");
    this.navCtrl.push(CircularViewComponent, { id : circularId });
  }

  openSuveyList() {
    this.configuration.setUrl("survey");
    this.appCtrl.getRootNav().setRoot(SurveyListPage);
  }

  openPollList() {
    this.goToPoll();
  }

  newComplaint() {

  }

  newSuggestion() {

  }

  newAppreciation() {
    
  }

}
