import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
	selector: 'event-view',
	templateUrl: 'event.html'
})

export class ViewEvent implements OnInit {

	public event;
	public eventId;
	public userID;
	public canEdit;
	public title: string = "View Event";

	constructor(public navParams: NavParams) {
	}

	ngOnInit() {
		this.eventId = this.navParams.get('eventId');
		this.event = this.navParams.get('event');
    console.log(this.event);
		// this.event["createdAt"] = ("0" + (new Date(this.event.createdAt).getDate())).slice(-2)
	}

}
