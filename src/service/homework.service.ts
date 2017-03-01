import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CustomHttpService } from './default.header.service';
import { Configuration } from './app.constants';

@Injectable()
export class HomeworkService {

  public serverUrl: string;

  constructor(private http: CustomHttpService,
              private configuration: Configuration) {
    this.serverUrl = this.configuration.Server;
  }

  public getHomeworkByStandard(standardId, page) {
    return this.http.get(this.serverUrl + "/standard/" + standardId + "/page/" + page)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getOldHomeworkByStandard(standardId, page) {
    return this.http.get(this.serverUrl + "/standard/" + standardId + "/old/page/" + page)
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
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
