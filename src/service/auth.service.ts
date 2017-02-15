import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Configuration } from './app.constants';

import { CustomHttpService } from './default.header.service';
import { SafeHttp } from './safe-http';


@Injectable()
export class AuthService {

  private actionUrl: string;
  private access_token: string;
  private data;
  public header;

  constructor(private _http : Http,
              private safeHttp: SafeHttp,
              private http: CustomHttpService,
              private toastCtrl: ToastController,
              private _configuration: Configuration) {
    this.actionUrl = _configuration.Server;
    this.header = _configuration.header();
  }

  public hasLogin: boolean = false;

  isLoggedIn() {
    if (localStorage.getItem("access_token")) {
      this._configuration.getHeader();
      return !this.hasLogin;
    } else {
      return this.hasLogin;
    }
  }

  // public getUser(phoneNo: number) {
  //   return this._http.get(this.actionUrl + "/login/parent/" + phoneNo)
  //     .toPromise()
  //     .then(res => { return Promise.resolve(res) })
  //     .catch(err => {
  //       if (err.status == 0) {
  //         this.safeHttp.ErrorMessage();
  //       } else {
  //         return Promise.reject(err);
  //       }
  //     });
  // }

  public getUser(phoneNo: number) {
    return this.http.get(this.actionUrl + "/login/parent/" + phoneNo)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public verifyOtp(phoneNo: number, otp: string) {
    this.data = {
      username: phoneNo,
      password: otp
    }
    return this.http.post(this.actionUrl + "/login", this.data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // public verifyOtp(phoneNo: number, otp: string) {
  //   this.data = {
  //     username: phoneNo,
  //     password: otp
  //   }
  //   return this._http.post(this.actionUrl + "/login", this.data)
  //     .toPromise()
  //     .then(response => {
  //       console.log("otp verify response", response)
  //       this.access_token = response.json().access_token;
  //       localStorage.setItem('access_token', this.access_token);
  //       this._configuration.getHeader();
  //       return Promise.resolve(response)
  //     })
  //     .catch(err => {
  //       console.log("otp verify err", err)
  //       if (err.status == 0) {
  //         this.safeHttp.ErrorMessage();
  //       } else {
  //         return Promise.reject(err);
  //       }
  //     });
  // }

  public getParentInfo() {
    return this.http.get(this.actionUrl + "/parent/info")
                        .map(this.extractData)
                        .catch(this.handleError);
  }

  public storeParentData(parent) {
    localStorage.setItem("id", parent.id);
    localStorage.setItem("name", parent.name);
    localStorage.setItem("email", parent.email);
    localStorage.setItem("contactNo", parent.contactNo);
    localStorage.setItem("students", JSON.stringify(parent.students));
    localStorage.setItem("nickName", parent.nickName);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }


}
