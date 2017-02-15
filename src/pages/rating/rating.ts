import { Component, OnInit } from '@angular/core';

// import modal
import { RatingModal } from './ratingModal';

// import service
import { ComplaintSuggestion } from '../../service/cs.service';
import { CustomService } from '../../service/customService';
import { ParentInfo } from '../../service/parentInfo';
import * as _ from 'underscore';

@Component({
  selector: 'student-rating',
  templateUrl: 'rating.html',
  styles:[`.csStarIcon{font-size: 70px;padding: 15px;;color: #00bcd4;} .center{text-align:center;} .title{height:80px;padding: 30px;} .stars{height:50px}
`]
})

export class StudentRating implements OnInit  {

  // set header title
  title: string = "Student Rating";

  public studentInfo;
  public emptyMessage;
  public students;
  public child;

  constructor(private r: ComplaintSuggestion,
              public parentInfo: ParentInfo,
              private nl: CustomService) { }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    let studentId = this.parentInfo.getStudents()[0].id;
    this.child = this.students[0];
    this.getRatingInfo(studentId);
  }

  selectChild(student) {
    this.getRatingInfo(student.id);
  }

  public getRatingInfo(stu_id) {
    this.nl.showLoader();
    this.r.getRatingInfo(stu_id).subscribe((res) => {
      this.onSuccess(res)
    }, (err) => {
      this.onError(err);
    });
  }

  onSuccess(info) {
    this.nl.hideLoader();
    this.studentInfo = info.profile;
    this.emptyMessage = false;
    if (info.isEmpty) {
      this.studentInfo = [];
      this.emptyMessage = true;
    }
  }

  onError(err) {
    this.nl.onError(err);
  }

}
