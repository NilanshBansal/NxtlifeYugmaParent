import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, MenuController, App } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import component
import { Dashboard } from '../pages/dashboard/dashboard';
import { SurveyListPage } from '../pages/survey/list/survey-list';
import { PollPage } from '../pages/poll/poll';
import { SuggestionTabs } from '../pages/suggestion/suggestionTabs';
import { AppreciationTabs } from '../pages/appreciation/appreciationTabs';
import { ComplaintPage } from '../pages/complaint/complaint';
import { PlannerComponent } from '../pages/planner/planner.component';
import { StudentRating } from '../pages/rating/rating';
import { AccountPage } from '../pages/account/account';
import { HomeworkTabs } from '../pages/homework/homeworkTabs';
import { CircularComponent } from '../pages/circular/circular.component';
import { UserSessionManage } from '../custom-component/user.session.manage';
import { MessagePage } from '../pages/message/message';

// import service
import { AuthService } from '../service/auth.service';
import { NetworkService } from '../service/network.service';
import { Configuration } from '../service/app.constants';

@Component({
  templateUrl: 'app.html'
})

export class MyApp extends UserSessionManage {

  @ViewChild(Nav) nav: Nav;
  public selectedPage;
  pages: Array<{title: string, component: any, icon: any, url: string}>;
  account: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform,
              public authService: AuthService,
              public menu: MenuController,
              public events: Events,
              public appCtrl: App,
              public alertCtrl: AlertController,
              private configuration: Configuration,
              public networkService: NetworkService) {
    super(events, menu, appCtrl, authService, alertCtrl, networkService);
    this.initializeApp();
    this.sidebarConfig();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.selectedPage = page.title;
    this.configuration.setUrl(page.url);
    this.nav.setRoot(page.component);
  }

  sidebarConfig() {
    this.pages = [
      { title: 'Home', component: Dashboard, icon: 'ios-home-outline', url: 'dashboard' },
      { title: 'Complaints', component: ComplaintPage, icon: 'ios-sad-outline', url: 'complaint' },
      { title: 'Suggestions', component: SuggestionTabs, icon: 'ios-bulb-outline', url: 'suggestion' },
      { title: 'Appreciations', component: AppreciationTabs, icon: 'ios-thumbs-up-outline', url: 'appreciation' },
      { title: 'Messaging', component: MessagePage, icon: 'ios-chatbubbles-outline', url: 'conversation' },
      { title: 'Calendar',component: PlannerComponent , icon: 'ios-calendar-outline', url: 'planner'},
      { title: 'Poll', component: PollPage, icon: 'ios-stats-outline', url: 'poll' },
      { title: 'Survey', component: SurveyListPage, icon: 'ios-analytics-outline', url: 'survey' },
      { title: 'Homework' , component : HomeworkTabs , icon : 'ios-book-outline' , url : 'homework' },
      { title: 'Circular',component : CircularComponent , icon : 'ios-paper-outline' , url : 'circular' },
      { title: 'Student Rating', component: StudentRating, icon: 'ios-pulse-outline', url: 'student-profile' },
    ];
    this.account = [
      { title: 'Account', component: AccountPage, icon: 'ios-contact-outline' }
    ];
  }

}
