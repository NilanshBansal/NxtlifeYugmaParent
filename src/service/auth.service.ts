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
  id;
  access_token;

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
      this.access_token = localStorage.getItem("access_token");
      this.id = localStorage.getItem("id");
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
    localStorage.setItem("fileUrl", parent.fileUrl);
    localStorage.setItem("picOriginalName", parent.picOriginalName);
    localStorage.setItem("picTimestamp", parent.picTimestamp);
  }

  uploadPic(image) {
    const fileTransfer: TransferObject = this.transfer.create();
    let filename = _.uniqueId() + ".jpg";
    let options = {
      fileKey: 'file',
      fileName: filename,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        'Content-Type': undefined,
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      params: {
        "file": filename
      }
    }; 

    return fileTransfer.upload(image, this.actionUrl + "/parent/" + this.id + "/picture", options, false).then((result: any) => {
      // alert(result);
      return result;
    }).catch((error: any) => {
      alert("err"+ error);
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
