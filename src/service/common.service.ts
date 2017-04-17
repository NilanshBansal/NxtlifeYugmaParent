import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { CustomHttpService } from './default.header.service';
import { Configuration } from './app.constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare const SockJS;
declare const Stomp;

@Injectable()
export class CommonService {

  public baseUrl: string;
  public serverUrl: string;

  constructor(private http: CustomHttpService,
              private con: Configuration) {
    this.baseUrl = this.con.baseUrl;
    this.getSockJs();
  }

  public storeData(field_name, data) {
    localStorage.setItem(field_name, JSON.stringify(data));
  }

  public getData(field_name) {
    let data = JSON.parse(localStorage.getItem(field_name));
    if (data) {
      return data;
    }
  }

  public getTomorrow() {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2)
    var year = currentDate.getFullYear()
    let tomorrow = year + '-' + month + '-' + day;
    return tomorrow;
  }

  public getSockJs() {
    let access_token = localStorage.getItem('access_token');
    let url = this.baseUrl + '/parent/nxtlife-websocket?access_token=' + access_token;
    var socket = new SockJS(url);
    return Stomp.over(socket);
  }


}