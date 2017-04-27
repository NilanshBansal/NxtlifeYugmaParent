import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, MenuController, App } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import component
import { Dashboard } from '../pages/dashboard/dashboard';
import { PollPage } from '../pages/poll/poll';
import { AppreciationTabs } from '../pages/appreciation/appreciationTabs';
import { ComplaintPage } from '../pages/complaint/complaint';
import { StudentRating } from '../pages/rating/rating';
import { AccountPage } from '../pages/account/account';
import { HomeworkTabs } from '../pages/homework/homeworkTabs';
import { Circular } from '../pages/circular/circular';
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
  userImage;

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
      this.imageUpdate();
    });
  }

  openPage(page) {
    this.selectedPage = page.title;
    this.configuration.setUrl(page.url);
    this.nav.setRoot(page.component);
  }
 
  sidebarConfig() {
    this.pages = [
      { title: 'Home', component: Dashboard, icon: 'assets/icon/home.png', url: 'dashboard' },
      { title: 'Complaints', component: ComplaintPage, icon: 'assets/icon/complaint.png', url: 'complaint' },
      { title: 'Appreciations', component: AppreciationTabs, icon: 'assets/icon/appreciation.png', url: 'appreciation' },
      { title: 'Messaging', component: MessagePage, icon: 'assets/icon/message.png', url: 'conversation' },
      { title: 'Events',component: EventComponent , icon: 'assets/icon/event.png', url: 'planner'},
      { title: 'Poll', component: PollPage, icon: 'assets/icon/poll.png', url: 'poll' },
      { title: 'Homework' , component : HomeworkTabs , icon : 'assets/icon/homework.png' , url : 'homework' },
      { title: 'Circular',component : Circular, icon : 'assets/icon/circular.png' , url : 'circular' },
      { title: 'Student Rating', component: StudentRating, icon: 'assets/icon/rating.png', url: 'student-profile' },
    ];
    this.account = [
      { title: 'Account', component: AccountPage, icon: 'assets/icon/profile.png' }
    ];
    let picTimestamp = localStorage.getItem("picTimestamp");
    let fileUrl = localStorage.getItem("fileUrl");
    this.userImage = fileUrl + "/" + picTimestamp;
  }

  public imageUpdate() {
    let picTimestamp = localStorage.getItem("picTimestamp");
    let fileUrl = localStorage.getItem("fileUrl");
    this.userImage = fileUrl + "/" + picTimestamp;
    this.events.subscribe("user:image", (image) => {
      this.userImage = image;
    });
  }

}
