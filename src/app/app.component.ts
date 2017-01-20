import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import component
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/homepage/homepage';
import { SurveyPage} from '../pages/survey/survey';
import { PollPage } from '../pages/poll/poll';
import { SuggestionTabs } from '../pages/suggestion/suggestionTabs';
import { AppreciationTabs } from '../pages/appreciation/appreciationTabs';
import { ComplaintPage } from '../pages/complaint/complaint';
import { PlannerComponent } from '../pages/planner/planner.component';
import { StudentRating } from '../pages/rating/rating';
import { AccountPage } from '../pages/account/account';

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
      { title: 'Suggestions', component: SuggestionTabs, icon: 'md-bulb', url: 'suggestion' },
      { title: 'Appreciations', component: AppreciationTabs, icon: 'ios-thumbs-up-outline', url: 'appreciation' },
      { title: 'Planner',component: PlannerComponent , icon: 'md-calendar', url: 'planner'},
      { title: 'Poll', component: PollPage, icon: 'ios-stats-outline', url: 'poll' },
      { title: 'Survey', component: SurveyPage, icon: 'ios-analytics-outline', url: 'survey' },
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
      this.authService.getParentInfo().then(user => {
        this.authService.storeParentData(user.json());
      }).catch(err => {
        if (err.status === 401) { this.presentConfirm(); }
      });
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

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Session Expired',
      message: "You're already logged in some other device. You may again login.",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            localStorage.clear();
            this.rootPage = LoginPage;
          }
        }
      ]
    });
    alert.present();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loadUser();
    });
  }
}
