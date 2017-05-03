import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../service/event.service';
import { ModalController} from 'ionic-angular';
import { CustomService } from '../../../service/custom.service';
import { ViewEvent } from '../view/event';

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
              public modalCtrl : ModalController) { }

  ngOnInit() {
    this.getEvents();
	}

  getEvents() {
    this.eventService.GetEventsTimeLine(this.currentPage).subscribe((res) => {
      if (res.status === 204) {
        console.log("No Events");
        this.EmptyEvent = true;
      } else {
        this.EmptyEvent = false;
        this.timeline = res;
      }
    }, (err) => {
      this.nl.errMessage();
    });
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
    this.nl.showLoader();
    this.eventService.GetParticularEvent(id).subscribe((res) => {
      this.nl.hideLoader();
      this.openViewEventModal(res);
    }, (err) => {
      this.nl.onError(err);
    });
  }

  openViewEventModal(data) {
    let viewModal = this.modalCtrl.create(ViewEvent, { event : data, eventId: data.id, clickDate: data.start });
    viewModal.present();
  }
}