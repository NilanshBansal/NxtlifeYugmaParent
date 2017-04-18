import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Configuration } from './app.constants';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from './default.header.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventNewService {

  public serverUrl: string;

  constructor(private http: CustomHttpService,
              private configuration: Configuration) {

  }

  public GetEvents(Eventmonth) {
		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl + '/month/' + Eventmonth)
			              .map(this.extractData)
                    .catch(this.handleError);
	}

  public getEvent(eventId) {
    this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl + '/' + eventId)
			              .map(this.extractData)
                    .catch(this.handleError);
  }

  public GetEventsTimeLine(pageNo){
		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl + "/page/" + pageNo)
                    .map(this.extractData)
                    .catch(this.handleError);
	}

  public GetParticularEvent(id){
		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl + '/' + id)
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
      if (error.status === 0) {
        errMsg = `${error.status} - "Something is wrong.."`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}