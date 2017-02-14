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
  templateUrl: 'rating.html'
})

export class StudentRating implements OnInit  {

  // set header title
  title: string = "Student Rating";

  public students;
  public student;
  public standardId;
  public studentId;
  public child;
  public studentInfo;
  public emptyMessage;

  constructor(private r: ComplaintSuggestion,
              public parentInfo: ParentInfo,
              private nl: CustomService) { }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    this.child = this.students[0];
    this.studentId = this.child.id;
    this.getRatingInfo();
  }

  selectChild(student) {
    this.studentId = student.id;
    this.getRatingInfo();
  }

  public getRatingInfo() {
    this.nl.showLoader();
    this.emptyMessage = false;
    this.r.getRatingInfo(this.studentId).subscribe((res) => {
      this.onSuccess(res)
    }, (err) => {
      this.onError();
    });
  }

  onSuccess(info) {
    this.nl.hideLoader();
    this.studentInfo = info.profile;
    if (info.isEmpty) {
      this.studentInfo = [];
      this.emptyMessage = true;
    }
  }

  onError() {
    this.nl.hideLoader();
    this.nl.errMessage();
  }

}
