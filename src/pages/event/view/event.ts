import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
	selector: 'event-view',
	templateUrl: 'event.html',
	styles: [`
		.csDate{
			background:#e9e9e9;
		}
		.csCalIcon{
			font-size: 50px !important;
		}
		ion-slides{
      		margin-bottom: 10px !important;
      		box-shadow: 0px 0px 13px black !important;
    }
	`]
})

export class ViewEvent implements OnInit {

	public event;
	public eventId;
	public userID;
	public canEdit;
	public month;
	public day;
	public title: string = "View Event";
	monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

	constructor(public navParams: NavParams) {
	}

	ngOnInit() {
		this.eventId = this.navParams.get('eventId');
		this.event = this.navParams.get('event');
		let clickDate = this.navParams.get('clickDate');
		this.month = this.monthNames[(new Date(clickDate)).getMonth()];
		this.day = ("0" + (new Date(clickDate).getDate())).slice(-2);
		// this.event["createdAt"] = ("0" + (new Date(this.event.createdAt).getDate())).slice(-2)
	}

}
