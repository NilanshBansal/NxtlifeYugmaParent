import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import {Configuration } from './app.constants';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class PollService {

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

    public GetPolls(){
        this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl,this.options)
		.map((res:Response) => res.json())
	}

    public PollVote(body){
        return this.http.post(this.serverUrl,body,this.options)
		.map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
    }
    
}