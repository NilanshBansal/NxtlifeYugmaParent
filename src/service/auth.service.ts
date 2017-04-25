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

declare const SockJS;
declare const Stomp;

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
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.access_token = access_token;
      this.getSockJs();
      return !this.hasLogin;
    } else {
      return this.hasLogin;
    }
  }

  public getSockJs() {
    let access_token = localStorage.getItem('access_token');
    let url = this.actionUrl + '/parent/nxtlife-websocket?access_token=' + access_token;
    var socket = new SockJS(url);
    return Stomp.over(socket);
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

  uploadPic(image, studentId) {
    const fileTransfer: TransferObject = this.transfer.create();
    this.id = localStorage.getItem("id");
    this.access_token = 'Bearer ' + localStorage.getItem('access_token');
    let filename = _.uniqueId() + ".jpg";
    let options = {
      fileKey: 'file',
      fileName: filename,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        'Content-Type': undefined,
        'Authorization': this.access_token
      },
      params: {
        "file": filename
      }
    }; 

    let url;

    if (studentId) {
      url = this.actionUrl + "/parent/" + this.id + "/student/" + studentId + "/picture";
    } else {
      url = this.actionUrl + "/parent/" + this.id + "/picture";
    }

    return fileTransfer.upload(image, url, options, false)
                       .then((result: any) => {
                         // alert(result);
                         return result;
                       }).catch((error: any) => {
                         alert("err" + JSON.stringify(error));
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
