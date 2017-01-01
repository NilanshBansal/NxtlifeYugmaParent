import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class Configuration {

  constructor() {

  }

  headers;

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

  public Server: string = "https://yugmasrgstesting.appspot.com";

  public ComplaintUrl(): string {
    return this.Server + "/parent/" + this.getParentId() + "/";
  }

  setUrl(url) {
    this.Server = "https://yugmasrgstesting.appspot.com/parent/" + this.getParentId() + "/" + url;
  }

}
