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

<<<<<<< HEAD
  public Server: string = "https://yugma-testing.appspot.com";

=======
>>>>>>> e59c7849d042bf82b32ff9dd00d15cdcf5e515dc
  public ComplaintUrl(): string {
    return this.Server + "/parent/" + this.getParentId() + "/";
  }

  setUrl(url) {
    this.cs.setHeaderText(url);
<<<<<<< HEAD
    this.Server = "https://yugma-testing.appspot.com/parent/" + this.getParentId() + "/" + url;
=======
    this.Server = this.baseUrl + "/parent/" + this.getParentId() + "/" + url;
>>>>>>> e59c7849d042bf82b32ff9dd00d15cdcf5e515dc

  }

  setUrlForStudentSuggestions(url) {
<<<<<<< HEAD
    this.Server = "https://yugma-testing.appspot.com/parent/" + this.getParentId() + "/suggestion/" + url;
  }

  setUrlForSuggestion() {
    this.Server = "https://yugma-testing.appspot.com/parent/" + this.getParentId() + "/suggestion";
  }

  setUrlForStudentAppreciations(url) {
    this.Server = "https://yugma-testing.appspot.com/parent/" + this.getParentId() + "/appreciation/" + url;
  }

  setUrlForAppreciations() {
    this.Server = "https://yugma-testing.appspot.com/parent/" + this.getParentId() + "/appreciation";
=======
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
>>>>>>> e59c7849d042bf82b32ff9dd00d15cdcf5e515dc
  }

  tokenUpdate(tokenId) {
    const notificationToken = {
      notificationToken: tokenId
    }
<<<<<<< HEAD
    return this.http.put("https://yugma-testing.appspot.com/parent/" + this.getParentId(), notificationToken)
=======
    return this.http.put(this.baseUrl + "/parent/" + this.getParentId(), notificationToken)
>>>>>>> e59c7849d042bf82b32ff9dd00d15cdcf5e515dc
                    .map((res: Response) => { return res; })
                    .catch((error: any) => Observable.throw(error || 'server error'));
  }

}
