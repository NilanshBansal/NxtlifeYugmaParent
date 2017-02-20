import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import {Configuration } from './app.constants';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class EventService {

	public headers;
    public options;
    serverUrl;

	constructor(private http: Http,
				private configuration : Configuration){

		this.configuration.getHeader();
		this.headers = this.configuration.header();
    this.options = new RequestOptions({
      headers : this.headers
    });
	}

	public AddNewEvent(body){
		this.serverUrl = this.configuration.Server;

     return this.http.post(this.serverUrl,body,this.options)

             .map((res:Response) => res.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'))

	}

	public GetParticularEvent(id){

		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl +'/' +id,this.options)

		.map((res:Response) => res.json())
	}

	public CopyGetParticularEvent(id){

		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl +'/'+ id,this.options)

		.map((res:Response) => res.json())
	}

	public GetEvents(Eventmonth){

		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl +'/month/'+ Eventmonth,this.options)

		.map((res:Response) => res.json())
	}

	public GetPlannerType(){

		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl +'type',this.options)
		.map((res:Response) => res.json())
	}

	public GetEventsTimeLine(pageNo){
		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl+"/page/"+pageNo,this.options)


		.map((res:Response) => res.json())
	}


	// public GetEventsTimeLine(){
	// 	return this.http.get(`https://yugma-ut.appspot-preview.com/director/3060931604/planner`)

	// 	.map((res:Response) => res.json())
	// }

	public GetStandard(){

		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl +'/type/standard',this.options)

		.map((res:Response) => res.json())
	}

	public putEvent(id,body){
		this.serverUrl = this.configuration.Server;


		 return this.http.put(this.serverUrl+id,body,this.options)

            .map((res:Response) => res.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'))

	}

	public DateEvents(Eventmonth,date){
		this.serverUrl = this.configuration.Server;
		return this.http.get(this.serverUrl+'/month/'+Eventmonth+'/'+date,this.options)
		.map((res:Response) => res.json())
	}


	public deleteEvent(id){

		this.serverUrl = this.configuration.Server;

		return this.http.delete(this.serverUrl+id,this.options);

	}

}
