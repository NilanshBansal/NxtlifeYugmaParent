import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, AlertController, MenuController, Events } from 'ionic-angular';

import { Configuration } from '../../service/app.constants';
import { AuthService } from '../../service/auth.service';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Push } from 'ionic-native';
import { Dashboard } from '../homepage/homepage';
import { CustomService } from '../../service/customService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit {

  otp;
  loading;
  loginForm: FormGroup;
  showOtp: boolean = false;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              public configuration: Configuration,
              public menuCtrl: MenuController,
              public events: Events,
              public nl: CustomService,
              private alertCtrl: AlertController) { this.menuCtrl.enable(false); }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', Validators.compose([Validators.minLength(10), Validators.required])]
    });
  }

  getOtp() {
    if (this.loginForm.valid) {
      this.showLoader("Authenticating...");
      this.authService.getUser(this.loginForm.value.mobileNo).subscribe((res) => {
        this.onSuccess(res);
      }, (err) => {
        this.onError(err);
      });
    }
  }

  public onSuccess(res) {
    this.showLoginForm(true);
    this.loading.dismiss();
  }

  public onError(err) {
    this.loading.dismiss();
    this.showLoginForm(false);
    if (err === 400) {
      this.nl.showToast("Number not registered");
    } else {
      this.nl.errMessage();
    }
  }

  verifyOtp() {
    if (this.otp != "") {
      this.showLoader("otp verifying...");
      this.authService.verifyOtp(this.loginForm.value.mobileNo, this.otp).subscribe((res) => {
        this.otpVerifySuccessfully(res);
      }, (err) => {
        this.otpVarifyFailed(err);
      });
    }
  }

  public otpVerifySuccessfully(res) {
    localStorage.setItem("access_token", res.access_token);
    this.getUserInfo();
  }

  public otpVarifyFailed(err) {
    this.showLoginForm(false);
    this.loading.dismiss();
    if (err === 400) {
      this.nl.showToast("otp not matched");
    } else {
      this.nl.errMessage();
    }
  }

  public getUserInfo() {
    this.authService.getParentInfo().subscribe((res) => {
      this.loading.dismiss();
      this.authService.storeParentData(res);
      this.navCtrl.setRoot(Dashboard);
    }, (err) => {
      this.loading.dismiss();
      this.nl.errMessage();
      this.showLoginForm(true);
    });
  }

  notificationError() {
    this.nl.showToast("Failed to update notification setting");
  }

  setNotificationToken() {
    let push = Push.init({
      android: {
        senderID: "562555006958"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      windows: {}
    });

    push.on('registration', (data) => {
      let confirmAlert = this.alertCtrl.create({
        title: 'Would you like to receive notification ?',
        message: "",
        buttons: [{
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'YES',
          handler: () => {
            this.showLoader('Please wait...');
            let tokenId = data.registrationId;
            this.configuration.tokenUpdate(tokenId).subscribe((res) => {
              this.loading.dismiss();
            }, (err) => {
              this.loading.dismiss();
              this.notificationError();
            });
          }
        }]
      });
      confirmAlert.present();
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

  public resendOtp(): void {
    this.getOtp();
  }

  public updateNo(): void {
    this.showLoginForm(false);
  }

  public showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  public showLoginForm(val) {
    this.showOtp = val;
  }

}
