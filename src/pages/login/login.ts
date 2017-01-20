import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, ToastController, AlertController, MenuController } from 'ionic-angular';

import { Configuration } from '../../service/app.constants';
import { AuthService } from '../../service/auth.service';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Push } from 'ionic-native';
import { Dashboard } from '../homepage/homepage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit {

  user: any;

  numberSubmit: boolean = false;
  otpSubmit: boolean = false;

  loginForm: FormGroup;
  loginVerifyForm: FormGroup;

  loading;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              public configuration: Configuration,
              public menuCtrl: MenuController,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController) { this.menuCtrl.enable(false); }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', Validators.compose([Validators.minLength(10), Validators.required])]
    });
  }

  getOtp() {
     if (!this.loginForm.valid) {
      this.numberSubmit = true;
    } else {

      let loader = this.loadingCtrl.create({
        content: "Authenticating..."
      });

      loader.present();

      this.authService.getUser(this.loginForm.value.mobileNo)
      .then(user => {
        this.user = user;
        loader.dismiss();
        this.loginVerifyForm = this.formBuilder.group({
          otp: ['', Validators.compose([Validators.minLength(5), Validators.required])]
        });
      })
      .catch(err => {
        loader.dismiss();
        if (err && err.status === 400) {
          let toast = this.toastCtrl.create({
            message: 'Number not registered.',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
        }
      });
    }
  }

  verifyOtp() {
    if (!this.loginVerifyForm.valid) {
      this.otpSubmit = true;
    } else {
      let loader = this.loadingCtrl.create({
        content: "Authenticating..."
      });

      loader.present();
      this.authService.verifyOtp(this.loginForm.value.mobileNo, this.loginVerifyForm.value.otp)
      .then(user => {
        this.authService.getParentInfo().then(res => {
          loader.dismiss();
          console.log("get parent Info", res)
          this.authService.storeParentData(res.json());
          this.navCtrl.setRoot(Dashboard);
          let toast1 = this.toastCtrl.create({
            message: 'Account setup successfully',
            duration: 5000,
            position: 'bottom'
          });
          toast1.present();
          this.setNotificationToken();
        });
      })
      .catch(err => {
        console.log("Errr", err)
        loader.dismiss();
        delete this.user;
        if (err.status === 400) {
          let toast = this.toastCtrl.create({
            message: 'otp not match',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
        }
      });
    }
  }

  presentLoadingDefault(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  notificationError() {
    let toast = this.toastCtrl.create({
      message: "Failed to update notification setting... try again later",
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
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
            this.presentLoadingDefault('Please wait...');
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
    delete this.user;
  }

}
