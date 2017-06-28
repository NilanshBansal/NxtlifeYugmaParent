import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../../service/homework.service'; 
import { CustomService } from '../../service/custom.service';
import { ParentInfo } from '../../service/parentInfo';

@Component({
  selector: 'timetable-page',
  templateUrl: 'timetable.html'
})

export class TimetablePage implements OnInit {

  public title: string = "Timetable";
  public students;
  public noTimetable: boolean = false;
  public child;
  public timeTable;
  public timeTableMonday;
  public date=new Date();
  public today=this.date.getDay();
  public dayNumber=this.today-1;
  public dayArray=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

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
        console.log("notimetable");
      } else {
        console.log("DFDFDF", res);
        this.timeTable = res;
       
        
      }
    }); 
  }

}