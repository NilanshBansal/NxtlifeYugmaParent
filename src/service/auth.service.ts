import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from './default.header.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private actionUrl: string = "https://yugma-testing.appspot.com";
  public header;

  constructor(private http: CustomHttpService,
              private toastCtrl: ToastController) {
  }

  public hasLogin: boolean = false;

  isLoggedIn() {
    if (localStorage.getItem("access_token")) {
      return !this.hasLogin;
    } else {
      return this.hasLogin;
    }
  }

  public getUser(phoneNo: number) {
    return this.http.get(this.actionUrl + "/login/parent/" + phoneNo)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public verifyOtp(data) {
    return this.http.post(this.actionUrl + "/login", data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

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
