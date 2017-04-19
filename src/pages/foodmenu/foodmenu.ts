import { NavController } from 'ionic-angular/index';
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { EventService } from '../../service/event.service';

@Component({
  templateUrl: "foodmenu.html"
})

export class FoodMenu {

  eventSource;
  viewTitle;
  title: string = "FoodMenu";

  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(private navController: NavController,
              private foodmenu: EventService) {
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    console.log("AAAAA", this.today);
    this.getFoodMenu();
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  getFoodMenu() {
    console.log("AAAA");
    this.foodmenu.getFoodMenu().subscribe((res) => {
      console.log("RES", res);
    }, (err) => {
      console.log("err", err)
    })
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}