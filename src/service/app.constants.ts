import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomService } from './custom.service';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class Configuration {

  public headers;
  public options;
  public baseUrl: string = "https://yugma-testing.appspot.com";
  public Server: string = "https://yugma-testing.appspot.com";

  constructor(public http: CustomHttpService,
              public cs: CustomService) {
  }

  getHeader() {
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
    });
  }

  header() {
    return this.headers;
  }

  public getParentId(): string {
    if (localStorage.getItem("id") != null) {
      return localStorage.getItem("id");
    }
  }

  public getAccessToken(): string {
    if (localStorage.getItem("access_token") != null) {
      return localStorage.getItem("access_token");
    }
  }

  public ComplaintUrl(): string {
    return this.Server + "/parent/" + this.getParentId() + "/";
  }

  setUrl(url) {
    this.cs.setHeaderText(url);
    this.Server = this.baseUrl + "/parent/" + this.getParentId() + "/" + url;

  }

  setUrlForStudentSuggestions(url) {
    this.Server = this.baseUrl + "/parent/" + this.getParentId() + "/suggestion/" + url;
  }

  setUrlForSuggestion() {
    this.Server = this.baseUrl + "/parent/" + this.getParentId() + "/suggestion";
  }

  setUrlForStudentAppreciations(url) {
    this.Server = this.baseUrl + "/parent/" + this.getParentId() + "/appreciation/" + url;
  }

  setUrlForAppreciations() {
    this.Server = this.baseUrl + "/parent/" + this.getParentId() + "/appreciation";
  }

  tokenUpdate(tokenId) {
    const notificationToken = {
      notificationToken: tokenId
    }
    return this.http.put(this.baseUrl + "/parent/" + this.getParentId(), notificationToken)
                    .map((res: Response) => { return res; })
                    .catch((error: any) => Observable.throw(error || 'server error'));
  }

}