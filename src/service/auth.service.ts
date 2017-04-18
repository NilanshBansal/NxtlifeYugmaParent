import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from './default.header.service';
import { Configuration } from './app.constants';
import { Transfer , TransferObject } from  '@ionic-native/transfer';
import { CommonService } from './common.service';
import * as _ from 'underscore';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private actionUrl: string;
  public header;

  constructor(private http: CustomHttpService,
              public config: Configuration,
              private transfer : Transfer,
              private commonService: CommonService,
              private toastCtrl: ToastController) {
    this.actionUrl = this.config.url;
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
    return this.http.post(this.actionUrl + "/oauth/token?grant_type=password&username="+data.username+"&password="+data.password, {})
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

  uploadPic(image) {
    let access_token = this.commonService.getData('access_token');
    const fileTransfer: TransferObject = this.transfer.create();
    let filename = _.uniqueId() + ".jpg";
    let options = {
      fileKey: 'file',
      fileName: filename,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        'Authorization': access_token
      },
      params: {
        "file": filename
      }
    };

    let id = localStorage.getItem('id');
    alert(image)
  
    return fileTransfer.upload(image, this.actionUrl + "/parent/" + id + "/picture", options, false).then((result: any) => {
      alert("AAAAAAAAAA " + result);
      return result;
    }).catch((error: any) => {
      alert("BBBBB " + error);
    }); 
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }

}
