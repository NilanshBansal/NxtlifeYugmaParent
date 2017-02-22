import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../../../service/homework.service';
import { CustomService } from '../../../service/custom.service';
import { ParentInfo } from '../../../service/parentInfo';

@Component({
  selector: 'current-homework',
  templateUrl: 'homework.html'
})

export class CurrentHomework implements OnInit {

  public title : string = 'Homework';
  public homework = [];
  public students;
  public child;

  constructor(private hw : HomeworkService,
              public parentInfo: ParentInfo,
              public nl: CustomService) {

  }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    let standardId = this.parentInfo.getStudents()[0].standardId;
    this.child = this.students[0];
    this.getHomework(standardId);
  }

  selectChild(student) {
    this.getHomework(student.standardId);
  }

  getHomework(standardId) {
    this.nl.showLoader();
    this.hw.getHomeworkByStandard(standardId).subscribe((res) => {
      this.nl.hideLoader();
      this.homework = res;
    }, (err) => {
      this.nl.onError(err);
    });
  }

}
