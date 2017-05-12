import { LoadingController, NavController, AlertController } from 'ionic-angular';
import { CustomService } from '../service/custom.service';
import { Configuration } from '../service/app.constants';
import { Push } from 'ionic-native';
import { Dashboard } from '../pages/dashboard/dashboard';

export class Notification {

  constructor(public navCtrl: NavController,
              public nl: CustomService,
              public loadingCtrl: LoadingController,
              public configuration: Configuration,
              public alertCtrl: AlertController) {
  }

  setNotificationToken() {
    let push = Push.init({
      android: {
        senderID: "562555006958"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true",
        gcmSandbox: "false"
      },
      windows: {}
    });

    push.on('registration', (data) => {
      // let confirmAlert = this.alertCtrl.create({
      //   title: 'Would you like to receive notification ?',
      //   message: "",
      //   buttons: [{
      //     text: 'NO',
      //     role: 'cancel'
      //   }, {
      //     text: 'YES',
      //     handler: () => {
      //       this.showLoader('Please wait...');
            let tokenId = data.registrationId;
            this.configuration.tokenUpdate(tokenId).subscribe((res) => {
              // this.loading.dismiss();
            }, (err) => {
              // this.loading.dismiss();
              // this.notificationError();
            });
      //     }
      //   }]
      // });
      // confirmAlert.present();
    });

    push.on('notification', (data) => {
      let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              self.navCtrl.setRoot(Dashboard);
            }
          }]
        });
        confirmAlert.present();
      } else {
        self.navCtrl.setRoot(Dashboard);
      }
    });

    push.on('error', (e) => {
      console.log("error---------------------------------------");
    });
  }

  loading;

  public showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  notificationError() {
    this.nl.showToast("Failed to update notification setting");
  }

}
