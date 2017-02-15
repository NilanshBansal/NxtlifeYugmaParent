import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomService } from './customService';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class Configuration {

  constructor(public http: CustomHttpService,
              public cs: CustomService) {

  }

  headers;
  options;

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

  public Server: string = "https://yugma-ut.appspot-preview.com";

  public ComplaintUrl(): string {
    return this.Server + "/parent/" + this.getParentId() + "/";
  }

  setUrl(url) {
    this.cs.setHeaderText(url);
    this.Server = "https://yugma-ut.appspot-preview.com/parent/" + this.getParentId() + "/" + url;
  }

  setUrlForStudentSuggestions(url) {
    this.Server = "https://yugma-ut.appspot-preview.com/parent/" + this.getParentId() + "/suggestion/" + url;
  }

  setUrlForSuggestion() {
    this.Server = "https://yugma-ut.appspot-preview.com/parent/" + this.getParentId() + "/suggestion";
  }

  setUrlForStudentAppreciations(url) {
    this.Server = "https://yugma-ut.appspot-preview.com/parent/" + this.getParentId() + "/appreciation/" + url;
  }

  setUrlForAppreciations() {
    this.Server = "https://yugma-ut.appspot-preview.com/parent/" + this.getParentId() + "/appreciation";
  }

  tokenUpdate(tokenId) {
    const notificationToken = {
      notificationToken: tokenId
    }
    return this.http.put(this.Server + "/parent/" + this.getParentId(), notificationToken)
                    .map((res: Response) => { return res; })
                    .catch((error: any) => Observable.throw(error || 'server error'));
  }

}
