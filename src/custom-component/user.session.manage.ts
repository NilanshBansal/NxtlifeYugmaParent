import { MenuController, AlertController, Events, App } from 'ionic-angular';
import { NoInternet } from './noInternet.component';
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { AuthService } from '../service/auth.service';
import { NetworkService } from '../service/network.service';
import { AccountPage } from '../pages/account/account';
import { PouchDbService } from "../service/pouchdbservice";

export class UserSessionManage {

  public name: string;
  public selectedPage:string;
  public rootPage: any;
  public userImage;

  constructor(public events: Events,
              public menu: MenuController,
              public appCtrl: App,
              public authService: AuthService,
              public alertCtrl: AlertController,
              public networkService: NetworkService,
              public pouchdbservice:PouchDbService) {

    this.handleEvents();
    this.networkService.checkNetworkStatus();
    this.hasLoggedIn();
  }

  public handleEvents() {
    this.events.subscribe('user:login', () => {
      this.login();
    });
    this.events.subscribe('session:expired', () => {
      this.sessionExpired();
    });
    this.events.subscribe('user:logout', () => {
      this.logout();
    });
    this.events.subscribe("offline", () => {
      this.offline();
    });
    this.events.subscribe("online", () => {
      this.online();
    });
    this.events.subscribe("user:image", (image) => {
      this.userImage = image;
    });
  }

  public hasLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.loadUser();
      this.getUserInfo();
      this.rootPage = Dashboard;
    } else {
      this.rootPage = LoginPage;
    }
  }

  public login() {
    this.enableMenu(true);
    this.loadUser();
    this.menu.close();
    this.appCtrl.getRootNav().setRoot(Dashboard);
    this.imageUpdate();
  }

  public imageUpdate() {
    let picTimestamp = localStorage.getItem("picTimestamp");
    let fileUrl = localStorage.getItem("fileUrl");
    this.userImage = fileUrl + "/" + picTimestamp;
  }

  public logout() {
    localStorage.clear();
    alert("deleting pouchdb");
    this.pouchdbservice.destroyDb();
    this.enableMenu(false);
    this.selectedPage = "";
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  public offline() {
    alert("you are offline");
    this.menu.close();
    this.appCtrl.getRootNav().setRoot(NoInternet);
  }

  public online() {
    if (this.authService.isLoggedIn()) {
      this.login();
    } else {
      this.logout();
    }
  }

  public enableMenu(loggedIn) {
    this.menu.enable(loggedIn);
  }

  public sessionExpired() {
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

  public openAccountPage() {
    this.menu.close();
    this.appCtrl.getRootNav().setRoot(AccountPage);
  }

  public getUserInfo() {
    this.authService.getParentInfo().subscribe((res) => {
      this.authService.storeParentData(res);
      this.imageUpdate();
    }, (err) => {
      if (err === 401 || err == 0) { this.sessionExpired(); }
    });
  }

}
