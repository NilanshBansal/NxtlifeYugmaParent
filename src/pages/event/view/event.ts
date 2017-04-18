import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ViewController, ActionSheetController } from 'ionic-angular';
import { EventService } from '../../../service/planner.service';
import { Configuration } from '../../../service/app.constants';
import { CustomService } from '../../../service/custom.service';
import { EditEvent } from '../edit/edit';

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

	constructor(public viewCtrl: ViewController,
							public modalCtrl: ModalController,
							public nl: CustomService,
							public eventService: EventService,
							public navParams: NavParams,
							public con: Configuration,
							public actionSheetCtrl: ActionSheetController) {
	}

	ngOnInit() {
		this.eventId = this.navParams.get('eventId');
		this.event = this.navParams.get('event');
    console.log(this.event);
		// this.event["createdAt"] = ("0" + (new Date(this.event.createdAt).getDate())).slice(-2)
	}

}
