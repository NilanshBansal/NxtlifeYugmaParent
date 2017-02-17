import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import {Configuration } from './app.constants';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SurveyService {

    public headers;
    public options;
    serverUrl;

    constructor(private http: Http,
                private configuration : Configuration) {
                    this.headers = this.configuration.header();
                  this.options = new RequestOptions({
                    headers : this.headers
                  });
                }

        getallsurveys(){
          console.log('headers',this.headers);
          this.serverUrl = this.configuration.Server;
           return this.http.get(this.serverUrl,this.options)
             .map((res:Response) => res.json())
        }

        getOneSurvey(id){
          this.serverUrl = this.configuration.Server;
          return this.http.get(this.serverUrl+'/'+id+"/questions/",this.options)
            .map((res:Response) => res.json())
        }

        PostSurveys(body){
          this.serverUrl = this.configuration.Server;
            return this.http.post(this.serverUrl ,body, this.options)
             .map((res:Response) => res.json())
        }

}