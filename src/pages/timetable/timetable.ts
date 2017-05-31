import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../../service/homework.service'; 
import { CustomService } from '../../service/custom.service';
import { ParentInfo } from '../../service/parentInfo';

@Component({
  selector: 'timetable-page',
  template: `
    <ion-header>
      <nl-navbar [title]="title"></nl-navbar>
    </ion-header>
    <ion-content class="complaint-list csMargin csGrayBackground">
      <ion-card>
        <ion-item *ngIf="students.length > 1">
          <ion-icon name="ios-body-outline" item-left large color="primary"></ion-icon>
          <ion-label color="primary">Child Name</ion-label>
          <custom-select item-content [(ngModel)]="child" (ngModelChange)="selectChild($event)">
            <ion-option *ngFor="let student of students" [value]="student">{{student.name}}</ion-option>
          </custom-select>
        </ion-item>
      </ion-card>
      <ion-list class="no-comment" *ngIf="noTimetable">
        <ion-icon name="bookmarks"></ion-icon>
        <br>NO RECORD FOUND
      </ion-list>
    </ion-content>
  `
})

export class TimetablePage implements OnInit {

  public title: string = "Timetable";
  public students;
  public noTimetable: boolean = false;
  public child;

  constructor(private timetable: HomeworkService,
              private nl: CustomService,
              public parentInfo: ParentInfo) {

  }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    this.child = this.students[0];
    this.getTimetable(this.students[0].standardId);
  }

  selectChild(student) {
    this.getTimetable(student.standardId);
  }

  getTimetable(standardId) {
    this.nl.showLoader();
    this.timetable.getTimetable(standardId).subscribe((res) => {
      this.nl.hideLoader();
      if (res.status === 204) {
        this.noTimetable = true;
      } else {
        console.log("Timetable")
      }
    }); 
  }

}