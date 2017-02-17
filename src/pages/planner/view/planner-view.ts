import {Component,OnInit} from '@angular/core';
import { EventService } from '../../../service/planner.service';  
import { NavController, NavParams, ModalController, ViewController ,AlertController ,LoadingController} from 'ionic-angular';
import {Events} from 'ionic-angular';
import { Configuration } from '../../../service/app.constant';


@Component({

	selector : 'event-modal',
	templateUrl: 'planner-view.html',
	providers: [EventService]
})


export class EventModalPage implements OnInit{

	
	public ResponseData = [];
	public resdata;
	public EventID;
	public userID;
	public evenTs;

	constructor(public viewCtrl: ViewController,
				public modalCtrl: ModalController,
				public _eventService : EventService,
				public navParams: NavParams,
				public navCtrl : NavController,
				public alrtCtrl : AlertController,
				public _events: Events,
    public _loadingCtrl: LoadingController){
			//	public _configurtion : Configuration){

		this.EventID = this.navParams.get('eventId');
		this.ResponseData = this.navParams.get('eventsss');
		//this.ResponseData = this.navParams.get('eventss');

		console.log('eventss',this.ResponseData);
		this._events.subscribe('events:edited', 
   			(data) => { this.loll(data);
      				console.log("_events subscribe", data);
     
  		});
	}

	
    
		loll(data){
  
	      // data[0].id = data[0].id;
	      data[0].title = data[0].title;
	      data[0].description = data[0].description;	   
	      data[0].startDate = data[0].startDate;
	      data[0].endDate = data[0].endDate;
	      data[0].startTime = data[0].startTime;
	      data[0].endTime = data[0].endTime;
	      data[0].plannerTypeName = data[0].plannerTypeName;


	      this.ResponseData = data[0];
	      console.log('this.valuedd',data[0]);
	  }
	



	GetOneEvent(){
         let loader = this._loadingCtrl.create({
             content: "Please wait...",
             // duration: 500
         });
        loader.present();
		this._eventService.GetParticularEvent(this.EventID)
    	.subscribe(
         	data => { this.ResponseData = data; loader.dismiss(); },
         	err => console.error(err),
         	() => console.log('GetParticularEvent',this.ResponseData),
      	)
	}



	// EditButtonAction(eventid){

	// 	// this.navCtrl.push(EventEditPage,{
	// 	// 	eventid : this.EventID,
	// 	// 	//title : this.ResponseData[0].title,

	// 	// });
	// 	this.OpenModal();

	// }
	presentConfirm() {
  			let alert = this.alrtCtrl.create({
    		title: 'Delete event',
    		message: 'Do you want to delete this event?',
    		buttons: [
      			{
       	 			text: 'No',
        			role: 'No',
        			handler: () => {
          				console.log('No clicked');
        			}
      			},
      			{
        			text: 'Yes',
        			handler: () => {
        				this._eventService.deleteEvent(this.EventID).subscribe( data => this.resdata = data  );
        				//this.popNavDel(dd);
        				this.dismiss();
            			console.log('Yes clicked');
        			}
      			}
    		]
  		});
  		alert.present();
	}







	DeleteButtonAction(){

		
		this.presentConfirm();
		
	}




presentLoading() {
    let loader = this._loadingCtrl.create({
      content: "Please wait...",
     // duration: 500
    });
    loader.present();
  }


	// popNavDel(dd){
	// 	this._events.publish('events:deleted',item());
	// }


	// OpenModal(){
	// 	this._eventService.CopyGetParticularEvent(this.EventID).subscribe((data) => { 
	// 		let modal = this.modalCtrl.create(EventEditModal, {data: data});
	//         modal.present();
	// 	}, (err) => {
	// 		console.log("Err", err)
    //   	});
	    
	//   }

	 dismiss(){
	 	this.viewCtrl.dismiss();
	 }

	ngOnInit(): void{
		
		
	}
}


















