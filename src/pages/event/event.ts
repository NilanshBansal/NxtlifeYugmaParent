import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EventService } from '../../service/planner.service';
import { CustomService } from '../../service/custom.service';
// import { AddEvent } from './add/add';
// import { ViewEvent } from './view/view';
// import { TimelinePage } from './timeline/timeline';
import * as _ from 'underscore';
import * as moment from 'moment';

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
  public isToday: boolean;
  public currentDate;
  public sel_index;
  public hasEvents;
  public sel_date;
  public canCreateNewEvent;
  public _eventSource;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  constructor(private nl: CustomService,
              public modalCtrl: ModalController,
              private eventService: EventService) {
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  timeline;

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.hasEvents = ev.events !== undefined && ev.events.length !== 0;
    this.currentDate = ev.selectedTime.getFullYear() + "-" + (ev.selectedTime.getMonth() + 1);
  }

  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    this.sel_date = event;
    this.currentDate = event.getFullYear() + "-" + (event.getMonth() + 1);
    var current = new Date();
    current.setHours(0, 0, 0);
    this.canCreateNewEvent = event < today;
  }

  createNewEvent() {
    this.getAllEvents(this.currentDate);
  }

  onRangeChanged(ev: { startTime: Date, endTime: Date }) {
    var eventMonth = this.currentDate;
    console.log("Res",ev)
    this.eventSource = [];
    this.getAllEvents(eventMonth);
  }

  getAllEvents(eventMonth) {
    this.eventService.GetEvents(eventMonth).subscribe((res) => {
      if (res.status == 204) {
        this.eventSource.length = 1;
      } else {
        this.buildArray(res);
      }
    }, (err) => {
      this.onError(err);
    });
  }

  buildArray(data) {
    let tmp = [];
    data.forEach((val, index) => {
      tmp.push({
        id: val.id,
        startTime: moment(val.start).toDate(),
        endTime: moment(val.start).toDate(),
        title: val.title,
        allDay: false,
        location: val.location,
        time1: val.startTime,
        time2: val.endTime,
        color: val.color,
        durationDays: val.durationDays
      });
    });
    this.eventSource = tmp;
    this._eventSource = _.clone(this.eventSource);
  }

  markDisabled (date:Date) {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  }

  // addNewEvent() {
  //   this._eventSource = _.clone(this.eventSource);
  //   let newEventModal = this.modalCtrl.create(AddEvent, { clickdate: this.sel_date });
  //   newEventModal.onDidDismiss((val) => {
  //     if (!val) { return; }
  //     this._eventSource.push({
  //       id: val.id,
  //       startTime: moment(val.start).toDate(),
  //       endTime: moment(val.end).toDate(),
  //       title: val.title,
  //       allDay: false,
  //       location: val.location,
  //       time1: val.startTime,
  //       time2: val.endTime,
  //       color: val.color,
  //       durationDays: val.durationDays
  //     });
  //     this.eventSource = this._eventSource;
  //   });
  //   newEventModal.present();
  // }

  // openViewEventModal(eventId, index) {
  //   this._eventSource = _.clone(this.eventSource);
  //   this.sel_index = index;
  //   this.nl.showLoader();
  //   this.eventService.GetParticularEvent(eventId).subscribe((res) => {
  //     this.onSuccess(res, eventId);
  //   }, (err) => {
  //     this.onError(err);
  //   });
  // }

  // onSuccess(data, eventId) {
  //   this.nl.hideLoader();
  //   let viewModal = this.modalCtrl.create(ViewEvent, {eventId: eventId, event: data, canEdit: this.canCreateNewEvent});
  //   viewModal.onDidDismiss((newVal, deletedEventId) => {
  //     if (!newVal) { return; }
  //     let hasDelete;
  //     if (newVal != "" && !deletedEventId) {
  //       hasDelete = this.findAndDelete(newVal.id);
  //       this.editEvent(newVal);
  //     } 
  //     if (deletedEventId) {
  //       hasDelete = this.findAndDelete(deletedEventId);
  //       this.rebuildArray();
  //     }
  //   });
  //   viewModal.present();
  // }

  findAndDelete(_eventId) {
    let flag = false;
    this._eventSource.forEach((val, index) => {
      if (val.id === _eventId) {
        this._eventSource.splice(index, 1);
        flag = true;
        return flag;
      }
    });
  }

  rebuildArray() {
    this.eventSource = this._eventSource;
  }

  editEvent(newVal) {
    this._eventSource.push({
      id: newVal.id,
      startTime: moment(newVal.start).toDate(),
      endTime: moment(newVal.end).toDate(),
      title: newVal.title,
      allDay: false,
      location: newVal.location,
      time1: newVal.startTime,
      time2: newVal.endTime,
      color: newVal.plannerTypeColor,
      durationDays: newVal.durationDays
    });
    this.rebuildArray();
  }

  onError(err) {
    this.nl.onError(err);
  }

  // openTimelineModal() {
  //   this._eventSource = _.clone(this.eventSource);
  //   let timelineModal = this.modalCtrl.create(TimelinePage);
  //   timelineModal.onDidDismiss((newVal, deletedEventId) => {
  //     this.eventSource = [];
  //     this.getAllEvents(this.currentDate);
  //   });
  //   timelineModal.present();
  // }

}