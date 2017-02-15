import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, AlertController, Events } from 'ionic-angular';

import { Configuration } from '../../service/app.constants';
import { AuthService } from '../../service/auth.service';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Push } from 'ionic-native';
import { Dashboard } from '../homepage/homepage';
import { CustomService } from '../../service/customService';
import { Notification } from '../../customComponent/notification.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage extends Notification implements OnInit {

  otp;
  loading;
  loginForm: FormGroup;
  showOtp: boolean = false;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              public configuration: Configuration,
              public events: Events,
              public nl: CustomService,
              public alertCtrl: AlertController) {
    super(navCtrl, nl, loadingCtrl, configuration, alertCtrl);
  }

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
    this.otp = "";
    if (err === 400) {
      this.nl.showToast("otp not matched");
    } else {
      this.nl.errMessage();
    }
  }

  public getUserInfo() {
    this.authService.getParentInfo().subscribe((res) => {
      this.loggedInSuccesfully(res);
    }, (err) => {
      this.loading.dismiss();
      this.nl.errMessage();
      this.showLoginForm(true);
    });
  }

  public loggedInSuccesfully(res) {
    this.loading.dismiss();
    this.authService.storeParentData(res);
    this.events.publish('user:login');
    this.setNotificationToken();
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
