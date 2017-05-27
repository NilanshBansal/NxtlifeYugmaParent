import { Component } from '@angular/core';

@Component({
  selector: 'timetable-page',
  template: `
    <ion-header>
      <nl-navbar [title]="title"></nl-navbar>
    </ion-header>
    <ion-content class="complaint-list csMargin csGrayBackground">
      <h3>Timetable Page</h3>
    </ion-content>
  `
})

export class TimetablePage {

  public title: string = "Timetable";

}