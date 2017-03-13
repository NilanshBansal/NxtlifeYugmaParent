import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, AlertController, Events, ModalController } from 'ionic-angular';

import { Configuration } from '../../service/app.constants';
import { AuthService } from '../../service/auth.service';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomService } from '../../service/custom.service';
import { Notification } from '../../custom-component/notification.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage extends Notification {

  public username;
  public password;
  public loading;

  constructor(public events: Events,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public configuration: Configuration,
              public nl: CustomService,
              public loadingCtrl: LoadingController,
              public appService: AuthService) {
    super(navCtrl, nl, loadingCtrl, configuration, alertCtrl);
  }

  login() {
    let data = {
      username: this.username,
      password: this.password
    }
    this.showLoader('Authenticating...');
    this.appService.verifyOtp(data).subscribe((res) => {
      this.verifySuccessfully(res);
    }, (err) => {
      this.verifyFailed(err);
    });
  }

  public verifySuccessfully(res) {
    localStorage.setItem("access_token", res.access_token);
    this.getUserInfo();
  }

  public verifyFailed(err) {
    this.loading.dismiss();
    if (err === 400) {
      this.nl.showToast("Invalid username or password");
    } else {
      this.nl.errMessage();
    }
  }

  public getUserInfo() {
    this.appService.getParentInfo().subscribe((res) => {
      this.loggedInSuccesfully(res);
    }, (err) => {
      this.loading.dismiss();
      this.nl.errMessage();
    });
  }

  public loggedInSuccesfully(res) {
    this.loading.dismiss();
    this.appService.storeParentData(res);
    this.events.publish('user:login');
    this.setNotificationToken();
  }

  public showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

}
