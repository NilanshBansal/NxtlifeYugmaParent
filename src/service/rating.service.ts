import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constants';

@Injectable()
export class RatingService {

  private baseUrl: string;
  public serverUrl: string;
  public access_token;
  public headers: any;
  public options;

  constructor(private http: Http,
              private configuration: Configuration) {

    this.headers = this.configuration.header();
    this.options = new RequestOptions({
      headers : this.headers
    });
  }

  public getRatingInfo(studentId): any {
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/" + studentId, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

}
