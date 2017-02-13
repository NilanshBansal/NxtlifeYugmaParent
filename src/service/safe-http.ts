import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './app.constants';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class SafeHttp {

  private access_token;
  private headers;

  constructor(private http: Http,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private _configuration: Configuration,
              private loadingCtrl: LoadingController) { }

  public ErrorMessage() {
    let toast = this.toastCtrl.create({
      message: 'Internal server error',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  public CustomErrorMessage() {
    let toast = this.toastCtrl.create({
      message: "Koi nai error he.. please check it",
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  get(url: string, options?: RequestOptions): Promise<any> {


    this.access_token = this._configuration.getAccessToken();

    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + this.access_token
    });

    var options = new RequestOptions({
      headers : this.headers
    });

    return this.http.get(url, options)
      .toPromise()
      .then(response => {
        return Promise.resolve(response);
      }, function(err) {
        console.log('err12222222', err)
        return Promise.reject(err || 'Server error');
      });
  }

  post(url: string, body: string, options?: RequestOptions) {

    this.access_token = this._configuration.getAccessToken();

    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + this.access_token
    });

    var options = new RequestOptions({
      headers : this.headers
    });

    return this.http.post(url, body, options)
      .toPromise()
      .then(res => {
        console.log("res2", res);
        return Promise.resolve(res);
      }, function(err) {
        console.log("err2", err);
        return Promise.reject(err || 'Server error');
      });
  }

  put(url: string, body: any, options?: RequestOptions) {

    this.access_token = this._configuration.getAccessToken();

    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + this.access_token
    });

    var options = new RequestOptions({
      headers : this.headers
    });

    return this.http.put(url, body, options)
      .toPromise()
      .then(res => {
        console.log("res2", res);
        return Promise.resolve(res);
      }, function(err) {
        console.log("err2", err);
        return Promise.reject(err || 'Server error');
      });
  }

}
