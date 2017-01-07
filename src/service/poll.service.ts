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

    constructor(private http: Http,
                private configur : Configuration){}

// setUrl(){
//     this.headers = new Headers({
//       'Content-Type' : 'application/json',
//       'Authorization' : 'Bearer ' + '2ea64cb9-bc81-4a3e-ae5d-5e85cb1adede'
//     });


//     this.options = new RequestOptions({
//       headers : this.headers
//     });

// }

    public GetPolls(){

        this.headers = new Headers({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + this.configur.getAccessToken()
        });

        this.options = new RequestOptions({
        headers : this.headers
        });


		return this.http.get(`https://yugmasrgstesting.appspot.com/parent/`+ this.configur.getParentId() +`/poll`,this.options)
		.map((res:Response) => res.json())
	}

    public PollVote(body){
        this.headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + this.configur.getAccessToken()
        });

        this.options = new RequestOptions({
        headers : this.headers
        });

        return this.http.post(`https://yugmasrgstesting.appspot.com/parent/`+ this.configur.getParentId() +`/poll`,body,this.options)
		.map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
    }
    
}