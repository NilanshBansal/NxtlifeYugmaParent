import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import {Configuration } from './app.constants';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class CircularService {

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


    getAllCirculars(){
       return this.http.get('https://yugmasrgstesting.appspot.com/parent/3752234690/circular/',this.options)
       .map((res:Response) => res.json())

    }

}