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
import { StudentRating } from '../pages/rating/rating';
import { AccountPage } from '../pages/account/account';
import { HomeworkTabs } from '../pages/homework/homeworkTabs';
import { CircularComponent } from '../pages/circular/circular.component';
import { UserSessionManage } from '../custom-component/user.session.manage';
import { MessagePage } from '../pages/message/message';
import { EventComponent } from '../pages/event/event';
import { FoodMenu } from '../pages/foodmenu/foodmenu'; 

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
      { title: 'Home', component: Dashboard, icon: 'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-4/256/home-icon.png', url: 'dashboard' },
      { title: 'Complaints', component: ComplaintPage, icon: 'http://www.clipartkid.com/images/108/beschreibung-smirc-thumbsdown-svg-XD7fzL-clipart.png', url: 'complaint' },
      { title: 'Suggestions', component: SuggestionTabs, icon: 'https://www.thecaribbeancurrent.com/wp-content/uploads/2014/11/A-good-idea.png', url: 'suggestion' },
      { title: 'Appreciations', component: AppreciationTabs, icon: 'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4c4.png', url: 'appreciation' },
      { title: 'Messaging', component: MessagePage, icon: 'https://lh3.ggpht.com/6qvGDjN7jg9G6cuZ0szgLS4U-CNm0JoK1a21J-inFltDogLdIycvVDo2L7_Zjzcw9A=w300', url: 'conversation' },
      { title: 'Events',component: EventComponent , icon: 'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-7/256/Calendar-icon.png', url: 'planner'},
      { title: 'Poll', component: PollPage, icon: 'https://cdn2.iconfinder.com/data/icons/Siena/256/poll%20green.png', url: 'poll' },
      { title: 'Survey', component: SurveyListPage, icon: 'http://www.freeiconspng.com/uploads/survey-icon-12.png', url: 'survey' },
      { title: 'Homework' , component : HomeworkTabs , icon : 'http://a5.mzstatic.com/us/r30/Purple1/v4/a6/9f/54/a69f54ff-d7c7-bf53-e3d2-75e9bf704b11/icon256.png' , url : 'homework' },
      { title: 'Circular',component : CircularComponent , icon : 'https://www.designswan.com/wp-content/uploads/2009/icon/3dOffice/3dicon21.png' , url : 'circular' },
      { title: 'Student Rating', component: StudentRating, icon: 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Actions-rating-icon.png', url: 'student-profile' },
    ];
    this.account = [
      { title: 'Account', component: AccountPage, icon: 'https://cdn4.iconfinder.com/data/icons/free-large-boss-icon-set/512/Caucasian_boss.png' }
    ];
  }

}
