import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Configuration } from './app.constants';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SurveyService {

  public headers;
  public options;
  serverUrl;

  constructor(private http: Http,
              private configuration: Configuration) {
    this.configuration.getHeader();
    this.headers = this.configuration.header();
    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  getallsurveys(pageNo) {
    console.log('headers', this.headers);
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + '/page/' + pageNo, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getOneSurvey(id) {
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + '/' + id + "/questions/", this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  PostSurveys(body) {
    this.serverUrl = this.configuration.Server;
    return this.http.post(this.serverUrl, body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }



  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  public storeCategories(data) {
    localStorage.setItem("categories", JSON.stringify(data));
  }

  public myCategories() {
    return JSON.parse(localStorage.getItem("categories"));
  }

}
