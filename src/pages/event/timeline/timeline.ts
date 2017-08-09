import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../service/event.service';
import { ModalController} from 'ionic-angular';
import { CustomService } from '../../../service/custom.service';
import { ViewEvent } from '../view/event';
import { PouchDbService } from "../../../service/pouchdbservice";

@Component({
	selector: 'timeline-view',
	templateUrl : 'timeline.html'
})

export class TimelinePage implements OnInit {

  public timeline = [];
  public title = "Timeline";
  public currentPage = 1;
  public EmptyEvent:boolean = false;

  constructor(public eventService : EventService,
              private nl : CustomService,
              public modalCtrl : ModalController,
              public pouchdbservice:PouchDbService) { }

  ngOnInit() {
    this.getEvents();
	}

  getEvents() {
    let that=this;
    this.eventService.GetEventsTimeLine(this.currentPage).subscribe((res) => {
      if (res.status === 204) {
        console.log("No Events");
        this.EmptyEvent = true;
      } else {
        this.EmptyEvent = false;
        this.timeline = res;
        this.pouchdbservice.addArrayOfObjectsToDoc(res,1,"evetime_");
      }
    }, (err) => {
      this.nl.errMessage();
       this.pouchdbservice.findDoc(1,"evetime_").then(function(doc){
        that.EmptyEvent = false;
        console.log("see doc: ",doc);
        var outputArray=that.convertObjToArray(doc);
         console.log("see res from db: ",outputArray);
        that.timeline=outputArray;
      });
    });
  }

convertObjToArray(res) {
    var resArray = [];
    var len = res["length"];
    for (var i = 0; i < len; i++) {
      resArray[i] = res[i];
    }
    if (len == 0) {
      alert("len 0");
      resArray = [];
    }
    return resArray;
  }

 doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.eventService.GetEventsTimeLine(this.currentPage).subscribe((res) => {
        if (res.status === 204) {
          this.currentPage -= 1;
          infiniteScroll.complete();
          return;
        }
        this.timeline = this.timeline.concat(res);
        infiniteScroll.complete();
      }, (err) => {
        this.currentPage -= 1;
        infiniteScroll.complete();
        this.nl.onError(err);
      });
    }, 1000);
  }

  onTimelineClick(id) {
    let that=this;
    this.nl.showLoader();
    this.eventService.GetParticularEvent(id).subscribe((res) => {
      this.nl.hideLoader();
      this.openViewEventModal(res);
      this.pouchdbservice.addSingleWithDelete(res,"eveview_",id);
    }, (err) => {
      this.nl.onError(err);
      this.pouchdbservice.findDoc(id,"eveview_").then(function(doc){
        that.openViewEventModal(doc);
     });
    });
  }

  openViewEventModal(data) {
    let viewModal = this.modalCtrl.create(ViewEvent, { event : data, eventId: data.id, clickDate: data.start });
    viewModal.present();
  }
}