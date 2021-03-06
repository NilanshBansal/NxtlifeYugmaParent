import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EventService } from '../../service/event.service';
import { CustomService } from '../../service/custom.service';
import * as moment from 'moment';
import { PouchDbService } from "../../service/pouchdbservice";

@Component({
  selector: 'foodmenu',
  templateUrl: 'foodmenu.html',
  styles: [`
    item-inner{
      border-left: 3px solid green !important;
    }
  `]
})

export class FoodMenu {

  public eventSource = [];
  public viewTitle;
  public currentDate;
  public hasEvents;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  constructor(private nl: CustomService,
              public modalCtrl: ModalController,
              private foodmenu: EventService,
              public pouchdbservice:PouchDbService) {
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.hasEvents = ev.events !== undefined && ev.events.length !== 0;
    this.currentDate = ev.selectedTime.getFullYear() + "-" + (ev.selectedTime.getMonth() + 1);
  }

  onCurrentDateChanged(event:Date) {
    this.currentDate = event.getFullYear() + "-" + (event.getMonth() + 1);
  }

  onRangeChanged(ev: { startTime: Date, endTime: Date }) {
    var eventMonth = this.currentDate;
    this.eventSource = [];
    this.getFoodMenu(eventMonth);
  }

  getFoodMenu(eventMonth) {
    this.foodmenu.GetEvents(eventMonth).subscribe((res) => {
      if (res.status == 204) {
        this.eventSource.length = 1;
      } else {
        this.eventSource = this.buildArray(res);
        this.pouchdbservice.add(res, "food" + eventMonth + "_");
      }
    }, (err) => {
      this.eventSource.length = 1;
      this.nl.errMessage();
      let that = this;
      this.pouchdbservice.getAllComplaints("food" + eventMonth + "_").then(function (res) {
        console.log("see: ",res);   
        that.eventSource=that.buildArray(res);
      });
    });
  }

  buildArray(data) {
    let tmp = [];
    data.forEach((val, index) => {
      tmp.push({
        id: val.id,
        title: val.foodType,
        startTime: moment(val.day).toDate(),
        endTime: moment(val.day).toDate(),
        allDay: false,
        foodPicUrl: val.foodPicUrl,
        foodName: val.foodName
      });
    });
     return tmp;
  }

}