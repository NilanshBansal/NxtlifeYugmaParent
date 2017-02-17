import { MenuController, AlertController, Events, App } from 'ionic-angular';
import { NoInternet } from './noInternet.component';
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/homepage/homepage';
import { AuthService } from '../service/auth.service';
import { NetworkService } from '../service/network.service';

export class UserSessionManage {

  public name: string;
  public selectedPage:string;
  public rootPage: any;

  constructor(public events: Events,
              public menu: MenuController,
              public appCtrl: App,
              public authService: AuthService,
              public alertCtrl: AlertController,
              public networkService: NetworkService) {
    this.listenToLoginEvents();
  }

  public listenToLoginEvents() {
    this.networkService.checkNetworkStatus();
    if (this.authService.isLoggedIn()) {
      this.loadUser();
      this.getUserInfo();
      this.rootPage = Dashboard;
    } else {
      this.rootPage = LoginPage;
    }
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      this.loadUser();
      this.appCtrl.getRootNav().setRoot(Dashboard);
    });
    this.events.subscribe('session:expired', () => {
      this.presentConfirm();
    });
    this.events.subscribe('user:logout', () => {
      localStorage.clear();
      this.enableMenu(false);
      this.selectedPage = "";
      this.appCtrl.getRootNav().setRoot(LoginPage);
    });
    this.events.subscribe("offline", () => {
      this.appCtrl.getRootNav().setRoot(NoInternet);
    });
    this.events.subscribe("online", () => {
      if (this.authService.isLoggedIn()) {
        this.loadUser();
        this.appCtrl.getRootNav().setRoot(Dashboard);
      } else {
        this.appCtrl.getRootNav().setRoot(LoginPage);
      }
    });
  }

  public enableMenu(loggedIn) {
    this.menu.enable(loggedIn);
  }

  public presentConfirm() {
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

  public loadUser() {
    this.name = localStorage.getItem("name");
  }

  public getUserInfo() {
    this.authService.getParentInfo().subscribe((res) => {
      this.authService.storeParentData(res);
    }, (err) => {
      if (err === 401) { this.presentConfirm(); }
      if (err === 0) { this.events.publish("offline");}
    });
  }

}
