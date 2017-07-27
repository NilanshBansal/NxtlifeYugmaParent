import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Configuration } from './app.constants';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from './default.header.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


/*[
  {
    "id": 57,
    "startTime": "2017-07-26T06:51:01.000Z",
    "endTime": "2017-07-26T06:51:59.000Z",
    "title": "dsdsd",
    "allDay": false,
    "location": "",
    "time1": "12:21 PM",
    "time2": "12:21 PM",
    "color": "#F44336",
    "durationDays": 0,
    "_id": "eve_57",
    "_rev": "1-9d8f57ef7c2742c585b78e27fdbf3323"
  }
]
*/
@Injectable()
export class EventService {

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