import {Component,OnInit} from '@angular/core';
import {EventService} from '../../../service/planner.service';
import {
  getDay,
  getMonth,
  getDate
  } from 'date-fns';
//import { AddEventPage } from '../add/planner-add';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { EventModalPage } from '../view/planner-view';



@Component({

	selector: 'calender-timeline-view',
	templateUrl : 'planner-timeline.html',
	//styleUrls : ['calender-timeline-view.scss']
  providers : [EventService]
})



export class CalendarTimelinePage implements OnInit {

  public timeline = [];
  public currentPage = 1;
  public Timeline = ['Dec 2016'];
  public newtimeline = [{'title':[],'month':'','day':'','date': {}}];
  //public events = [];
  constructor(public eventservice : EventService,
              public navCtrl : NavController,
              public modalCtrl: ModalController){};

 //  AllEvents(){

 //     this.eventservice.GetEvents()
 //     .subscribe(
 //         data => { this.timeline = data; this.pop(); },
 //         err => console.error(err),
 //         () => console.log('timeline',this.timeline),
 //      )
 // }


   AllEvents(){

     this.eventservice.GetEventsTimeLine(this.currentPage)
     .subscribe(
         data => { this.timeline = data; this.pop(); },
         err => console.error(err)
        // () => console.log('timeline',this.timeline),
      )
 }


//   AddEvent(event, item) {
//     this.navCtrl.push(AddEventPage, {
//       item: item
//     });
//   }



 public months = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
 public days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']




//  pop(){

//   for(let i=0;i<this.timeline.length;i++){
//     for(let j=0; j<this.timeline[i].events.length;j++){
       
//        this.newtimeline[0].title.push(this.timeline[i].events[j].title);
//        this.newtimeline[0].month = this.months[getMonth(this.timeline[i].events[j].start)];
//        this.newtimeline[0].date = getDate(this.timeline[i].events[j].start);
//        this.newtimeline[0].day = this.days[getDay(this.timeline[i].events[j].start)];

//      }
// }   

//   console.log('newtimeline[]',this.newtimeline);
// }

titleClicked(id){
  console.log('title clicked',id);
}



pop(){
  for(let i=0;i<this.timeline.length;i++){
        for(let j=0; j<this.timeline[i].events.length;j++){
       
         this.timeline[i].events[j].title = this.timeline[i].events[j].title;
         this.timeline[i].events[j].end = getDate(this.timeline[i].events[j].start);
         this.timeline[i].events[j].description = this.months[getMonth(this.timeline[i].events[j].start)];
         this.timeline[i].events[j].start = this.days[getDay(this.timeline[i].events[j].start)];
         
     }
  }



  console.log('heheTimeLine',this.timeline);
   }
 

   public eventss;
   EventTimelineClick(id){
     console.log('id',id);
      this.eventservice.GetParticularEvent(id)
        .subscribe( data => { this.eventss =  data; this.OpenModal(this.eventss)},
        () => console.log('tamoline',this.eventss))

        //EventModalPage
   }


   OpenModal(abc){
    let modal = this.modalCtrl.create(EventModalPage,{
      eventss : abc
    });
       modal.present();
  }


	ngOnInit(){

    this.AllEvents();
	}
}