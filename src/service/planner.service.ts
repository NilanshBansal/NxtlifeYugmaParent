import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class EventService {

	constructor(private http: Http){}

	public AddNewEvent(body){
		let headers = new Headers({'Content-Type': 'application/json'});
     	let options = new RequestOptions({ headers : headers });

     return this.http.post(`https://yugma-ut.appspot-preview.com/director/3060931604/planner`,body,options)
             .map((res:Response) => res.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'))

	}


	public GetParticularEvent(id){
		return this.http.get('https://yugma-ut.appspot-preview.com/director/3060931604/planner/'+ id)
		.map((res:Response) => res.json())
	}


	public CopyGetParticularEvent(id){
		return this.http.get('https://yugma-ut.appspot-preview.com/director/3060931604/planner/'+ id)
		.map((res:Response) => res.json())
	}


	public GetEvents(Eventmonth){
		return this.http.get('https://yugma-ut.appspot-preview.com/director/3060931604/planner/month/'+ Eventmonth)
		.map((res:Response) => res.json())
	}


	public GetPlannerType(){
		return this.http.get('https://yugma-ut.appspot-preview.com/director/3060931604/planner/type')
		.map((res:Response) => res.json())
	}


	public GetEventsTimeLine(){
		return this.http.get(`https://yugma-ut.appspot-preview.com/director/3060931604/planner`)
		.map((res:Response) => res.json())
	}


	public GetStandard(){
		return this.http.get('https://yugma-ut.appspot-preview.com/director/3060931604/planner/type/standard')
		.map((res:Response) => res.json())
	}


	public putEvent(id,body){

		let headers = new Headers({'Content-Type': 'application/json'});
     	let options = new RequestOptions({ headers : headers });

		 return this.http.put(`https://yugma-ut.appspot-preview.com/director/3060931604/planner/`+id,body,options)
            .map((res:Response) => res.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'))

	}

	public deleteEvent(id){
		let headers = new Headers({'Content-Type': 'application/json'});
     	let options = new RequestOptions({ headers : headers });
		return this.http.delete(`https://yugma-ut.appspot-preview.com/director/3060931604/planner/`+id,options);
	}

}
