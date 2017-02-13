import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CustomHttpService } from './default.header.service';
import { Configuration } from './app.constants';

@Injectable()
export class ComplaintSuggestion {

  private baseUrl: string;
  public serverUrl: string;
  public access_token;
  public headers: any;
  public options;

  constructor(private http: CustomHttpService,
              private configuration: Configuration) {

  }

  getUrl() {
    this.headers = this.configuration.header();
    this.options = new RequestOptions({
      headers : this.headers
    });
  }

  public getComplaints(pageNo): any {
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/page/" + pageNo)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getTeachers(standardId) {
    return this.http.get(this.serverUrl + "/teacher/" + standardId)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getCategories() {
    this.getUrl();
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/category")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public saveComplaint(complaintData): any {
    return this.http.post(this.serverUrl, complaintData)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public closeComplaint(complaintId, complaintReason) {
    return this.http.put(this.serverUrl + "/" + complaintId + "/close", complaintReason)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public satisfiedComplaint(complaintId) {
    return this.http.put(this.serverUrl + "/" + complaintId + "/satisfied", {})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public reopenComplaint(complaintId, reopenData) {
    return this.http.put(this.serverUrl + "/" + complaintId + "/reopen", reopenData)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public postComment(complaintId, comment) {
    return this.http.post(this.serverUrl + "/" + complaintId + "/comment", comment)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getComments(complaintId) {
    return this.http.get(this.serverUrl + "/" + complaintId + "/comment")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getRatingInfo(studentId): any {
    this.getUrl();
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/" + studentId)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
