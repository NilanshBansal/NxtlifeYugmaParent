import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constants';

@Injectable()
export class ComplaintSuggestion {

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

  public getComplaints(pageNo): any {
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/page/" + pageNo, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getTeachers(standardId) {
    return this.http.get(this.serverUrl + "/teacher/" + standardId, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getCategories() {
    return this.http.get(this.serverUrl + "/category", this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public saveComplaint(complaintData): any {
    return this.http.post(this.serverUrl, complaintData, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public closeComplaint(complaintId, complaintReason) {
    return this.http.put(this.serverUrl + "/" + complaintId + "/close", complaintReason, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public satisfiedComplaint(complaintId) {
    return this.http.put(this.serverUrl + "/" + complaintId + "/satisfied", {}, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public reopenComplaint(complaintId, reopenData) {
    return this.http.put(this.serverUrl + "/" + complaintId + "/reopen", reopenData, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public postComment(complaintId, comment) {
    return this.http.post(this.serverUrl + "/" + complaintId + "/comment", comment, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getComments(complaintId) {
    return this.http.get(this.serverUrl + "/" + complaintId + "/comment", this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getRatingInfo(studentId): any {
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/" + studentId, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

}
