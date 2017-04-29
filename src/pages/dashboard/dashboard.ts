import { Component } from '@angular/core';
import { NavController, ModalController, App, Events, FabContainer } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { PollPage } from '../poll/poll';
import { AppreciationTabs } from '../appreciation/appreciationTabs';
import { StudentRating} from '../rating/rating';
import { ComplaintPage} from '../complaint/complaint';
import { Configuration } from '../../service/app.constants';
import { EventComponent } from '../event/event';
import { HomeworkTabs } from '../homework/homeworkTabs';
import { Circular } from '../circular/circular';
import { ViewEvent } from '../event/view/event';
import { ViewCircular } from '../circular/view/view';
import { newComplaintModal } from '../complaint/new/newComplaintModal';
import { NewAppreciationModal } from '../appreciation/new/appreciation';
import { MessagePage } from '../message/message';
import { AccountPage } from '../account/account';

import { ComplaintSuggestion } from '../../service/cs.service';
import { CustomService } from '../../service/custom.service';
import { EventService } from '../../service/event.service';

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

  public title: string = "Dashboard";
  public hasData: boolean = false;

  public dash_data = {
    planner: [],
    openPoll: [],
    circular: [],
    pollCount: ""
  }

  public page = {
    complaint: ComplaintPage,
    planner: EventComponent,
    appreciation: AppreciationTabs,
    rating: StudentRating,
    poll: PollPage,
    homework: HomeworkTabs,
    messaging: MessagePage,
    account: AccountPage,
    circular: Circular
  }

  constructor(public menuCtrl: MenuController,
              public configuration: Configuration,
              public cs: ComplaintSuggestion,
              public nl: CustomService,
              public appCtrl: App,
              public events: Events,
              public modalCtrl: ModalController,
              public eventService: EventService,
              private navCtrl: NavController) {
    this.menuCtrl.enable(true);
    this.configuration.setUrl("dashboard");
  }

  public openPage(componentName, urlName) {
    this.configuration.setUrl(urlName);
    this.navCtrl.setRoot(componentName);
  }

  public ionViewWillEnter() {
    this.getDashboardData();
  }

  public getDashboardData() {
    this.configuration.setUrl("dashboard");
    this.cs.getDashboardData().subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
      this.hasData = true;
    });
  }

  public onSuccess(data) {
    this.hasData = true;
    this.dash_data = {
      planner: data.planner,
      openPoll: data.poll,
      circular: data.circular,
      pollCount : data.pollCount
    }
  }

  public onError(err) {
    if (err == 401 || err == 0) {
      this.events.publish("session:expired");
    }
    this.nl.showToast(err);
  }

  public GoToEvent(eventId) {
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

  public openModal(data) {
    let modal = this.modalCtrl.create(ViewEvent, { eventsss : data });
    modal.present();
  }

  public goToPoll() {
    this.configuration.setUrl("poll");
    this.appCtrl.getRootNav().setRoot(PollPage);
  }

  public goToCircular(circularId) {
    this.configuration.setUrl("circular");
    this.navCtrl.push(ViewCircular, { id : circularId });
  }

  public openPollList() {
    this.goToPoll();
  }

  public newComplaint(fab: FabContainer) {
    this.configuration.setUrl("complaint");
    fab.close();
    let createNew = this.modalCtrl.create(newComplaintModal);
    createNew.present();
  }

  public newSuggestion(fab: FabContainer) {
    this.configuration.setUrl("suggestion");
    fab.close();
    let createNew = this.modalCtrl.create(newComplaintModal);
    createNew.present();
  }

  public newAppreciation(fab: FabContainer) {
    fab.close();
    this.configuration.setUrl("appreciation");
    let createNew = this.modalCtrl.create(NewAppreciationModal);
    createNew.present();
  }

}
