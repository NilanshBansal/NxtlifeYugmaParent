import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import component
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/homepage/homepage';
import { SurveyListPage } from '../pages/survey/list/survey-list';
import { PollPage } from '../pages/poll/poll';
import { SuggestionTabs } from '../pages/suggestion/suggestionTabs';
import { AppreciationTabs } from '../pages/appreciation/appreciationTabs';
import { ComplaintPage } from '../pages/complaint/complaint';
import { PlannerComponent } from '../pages/planner/planner.component';
import { StudentRating } from '../pages/rating/rating';
import { AccountPage } from '../pages/account/account';
import { HomeworkComponent } from '../pages/homework/homework.component';
import { CircularComponent } from '../pages/circular/circular.component';

// import service
import { AuthService } from '../service/auth.service';
import { NetworkService } from '../service/network.service';
import { Configuration } from '../service/app.constants';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  public rootPage: any;
  name: string;
  selectedPage:string;

  pages: Array<{title: string, component: any, icon: any, url: string}>;
  account: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform,
              public authService: AuthService,
              public menu: MenuController,
              public events: Events,
              private alertCtrl: AlertController,
              private configuration: Configuration,
              public networkService: NetworkService) {

    this.initializeApp();
    this.listenToLoginEvents();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Dashboard, icon: 'ios-home-outline', url: 'dashboard' },
      { title: 'Complaints', component: ComplaintPage, icon: 'ios-sad-outline', url: 'complaint' },
      { title: 'Suggestions', component: SuggestionTabs, icon: 'ios-bulb-outline', url: 'suggestion' },
      { title: 'Appreciations', component: AppreciationTabs, icon: 'ios-thumbs-up-outline', url: 'appreciation' },
      { title: 'Calendar',component: PlannerComponent , icon: 'ios-calendar-outline', url: 'planner'},
      { title: 'Poll', component: PollPage, icon: 'ios-stats-outline', url: 'poll' },
      { title: 'Survey', component: SurveyListPage, icon: 'ios-analytics-outline', url: 'survey' },
      { title: 'Homework' , component : HomeworkComponent , icon : 'ios-book-outline' , url : 'homework' },
      { title: 'Circular',component : CircularComponent , icon : 'ios-paper-outline' , url : 'circular' },
      { title: 'Student Rating', component: StudentRating, icon: 'ios-pulse-outline', url: 'student-profile' },
    ];

    this.account = [
      { title: 'Account', component: AccountPage, icon: 'ios-contact-outline' }
    ];

  }

  initializeApp() {

    this.networkService.checkNetworkStatus();

    if (this.authService.isLoggedIn()) {
      this.loadUser();
      this.rootPage = Dashboard;
      this.getUserInfo();
    } else {
      this.rootPage = LoginPage;
    }

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  public getUserInfo() {
    this.authService.getParentInfo().subscribe((res) => {
      this.authService.storeParentData(res);
    }, (err) => {
      if (err === 401) { this.presentConfirm(); }
    });
  }

  loadUser() {
    this.name = localStorage.getItem("name");
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.selectedPage = page.title;
    this.configuration.setUrl(page.url);
    this.nav.setRoot(page.component);
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Session Expired',
      message: "You're already logged in some other device. You may again login.",
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Logout',
        handler: () => {
          this.events.publish("user:logout");
        }
      }]
    });
    alert.present();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loadUser();
      this.enableMenu(true);
      this.nav.setRoot(Dashboard);
    });
    this.events.subscribe('session:expired', () => {
      this.presentConfirm();
    });
    this.events.subscribe('user:logout', () => {
      localStorage.clear();
      this.enableMenu(false);
      this.selectedPage = "";
      this.nav.setRoot(LoginPage);
    });
  }
}
