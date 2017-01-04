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

  constructor(private r: RatingService,
              public parentInfo: ParentInfo,
              public modalCtrl: ModalController,
              private nl: CustomService) {

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
    console.log("qqqqqq", this.standardId)
    this.r.getRatingInfo(this.standardId).subscribe((categories) => {
      this.nl.hideLoader();
      console.log("DSADASD", categories.json())
    }, (err) => {
      this.nl.hideLoader();
      this.nl.errMessage();
    });
  }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    if (this.students.length === 1) {
      this.child = this.students[0];  // Auto select for one child
      this.getRatingInfo();
    }
  }

}
