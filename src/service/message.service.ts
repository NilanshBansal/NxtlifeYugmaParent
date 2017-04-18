import { Injectable } from '@angular/core';
import { CustomHttpService } from './default.header.service';
import { Configuration } from './app.constants';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {

  public serverUrl: string;

  constructor(private http: CustomHttpService,
              private configuration: Configuration) {

  }

  public getAllMessages(pageNo) {
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/page/" + pageNo)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getCategories(standardId) {
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/category/" + standardId)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getMessage(id) {
    this.serverUrl = this.configuration.Server;
    return this.http.get(this.serverUrl + "/" + id + "/page/1")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public saveMessage(data) {
    this.serverUrl = this.configuration.Server;
    return this.http.post(this.serverUrl,data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public postMessage(id, data) {
    this.serverUrl = this.configuration.Server;
    return this.http.post(this.serverUrl + "/" + id, data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public closeConversation(id) {
    this.serverUrl = this.configuration.Server;
    return this.http.put(this.serverUrl + "/" + id, {})
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
      errMsg = `${error.status} - ${error.statusText || ''}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
