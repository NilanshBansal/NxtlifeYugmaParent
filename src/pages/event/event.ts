import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EventService } from '../../service/event.service';
import { CustomService } from '../../service/custom.service';
import { ViewEvent } from './view/event';
import { TimelinePage } from './timeline/timeline';
import * as moment from 'moment';
import { PouchDbService } from "../../service/pouchdbservice";


@Component({
  selector: 'events',
  templateUrl: 'event.html',
  styles: [`
    item-inner{
      border-left: 3px solid green !important;
    }
  `]
})

export class EventComponent {

  public eventSource = [];
  public viewTitle;
  public currentDate;
  public hasEvents;
  public clickDate;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  constructor(private nl: CustomService,
    public modalCtrl: ModalController,
    private eventService: EventService,
    private pouchdbservice: PouchDbService) {
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.hasEvents = ev.events !== undefined && ev.events.length !== 0;
    this.currentDate = ev.selectedTime.getFullYear() + "-" + (ev.selectedTime.getMonth() + 1);
    console.log("AAAAA", this.currentDate);
    this.clickDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    this.currentDate = event.getFullYear() + "-" + (event.getMonth() + 1);
  }

  onRangeChanged(ev: { startTime: Date, endTime: Date }) {
    var eventMonth = this.currentDate;
    this.eventSource = [];
    console.log("BBBBB", this.currentDate)
    this.getAllEvents(eventMonth);
  }

  getAllEvents(eventMonth) {
    this.eventService.GetEvents(eventMonth).subscribe((res) => {
      if (res.status == 204) {
        //TODO nilansh
       // this.eventSource=[];
        this.eventSource.length = 1;
      } else {

        this.eventSource = this.buildArray(res);
        this.pouchdbservice.add(this.eventSource, "eve_");
        alert("see console");
        console.log("see", this.eventSource);
      }
    }, (err) => {
      this.onError(err);
      let that = this;
      this.pouchdbservice.getAllComplaints("eve_").then(function (res) {
        that.eventSource = that.buildArray(res);
        //console.log(that.eventSource);
      });
    });
  }

  buildArray(data) {
    let tmp = [];
    data.forEach((val, index) => {
      tmp.push({
        id: val.id,
        startTime: moment(val.start).toDate(),
        endTime: moment(val.end).toDate(),
        title: val.title,
        allDay: false,
        location: val.location,
        time1: val.startTime,
        time2: val.endTime,
        color: val.color,
        durationDays: val.durationDays
      });
    });

    return tmp;

  }

  markDisabled(date: Date) {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  }

  openViewEventModal(eventId, index) {
    this.nl.showLoader();
    this.eventService.getEvent(eventId).subscribe((res) => {
      this.pouchdbservice.addSingleWithDelete(res, "eveview_",res["id"]);
      this.onSuccess(res, eventId);
    }, (err) => {
      let that = this;
      this.onError(err);
      this.pouchdbservice.findDoc(eventId, "eveview_").then(function (res) {
        that.onSuccess(res, res.id);
      });
    });
  }

  onSuccess(data, eventId) {
    this.nl.hideLoader();
    let viewModal = this.modalCtrl.create(ViewEvent, { eventId: eventId, event: data, clickDate: data.start });
    viewModal.present();
  }

  onError(err) {
    this.nl.onError(err);
  }

  openTimelineModal() {
    let timelineModal = this.modalCtrl.create(TimelinePage);
    timelineModal.present();
  }

}