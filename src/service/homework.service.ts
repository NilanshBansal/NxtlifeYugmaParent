import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import {Configuration } from './app.constants';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class HomeworkService {

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

     getHomeworks(){
       // this.serverUrl = this.configuration.Server;
        return this.http.get('https://yugma-ut.appspot-preview.com/parent/864867303/homework',this.options)
         .map((res:Response) => res.json())

     }

}
