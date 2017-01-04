import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';

// import modal
import { RatingModal } from './ratingModal';

// import service
import { RatingService } from '../../service/rating.service';
import { CustomService } from '../../service/customService';
import { ParentInfo } from '../../service/parentInfo';

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

  fillStarts = [];

  constructor(private r: RatingService,
              public parentInfo: ParentInfo,
              public modalCtrl: ModalController,
              private nl: CustomService) {

  }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    if (this.students.length === 1) {
      this.child = this.students[0];  // Auto select for one child
      this.getRatingInfo();
    }
  }

  selectChild(student) {
    if (student) {
      this.studentId = student.id;
      this.standardId = student.standardId;
      this.getRatingInfo();
    }
  }

  public getRatingInfo() {
    this.nl.showLoader();
    this.r.getRatingInfo(this.standardId).subscribe((res) => {
      this.onSuccess(res.json())
    }, (err) => {
      this.onError();
    });
  }

  onSuccess(info) {
    this.nl.hideLoader();
    this.studentInfo = info.profile;
    console.log("DSADSAD", info);
    if (info.isEmpty) {
      this.nl.showToast("student rating not filled by class teacher");
      this.fillStarts= [];
    }
  }

  onError() {
    this.nl.hideLoader();
    this.nl.errMessage();
  }

}
