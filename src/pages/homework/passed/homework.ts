import { Component } from '@angular/core';
import { HomeworkService } from '../../../service/homework.service';
import { CustomService } from '../../../service/custom.service';
import { ParentInfo } from '../../../service/parentInfo';

import * as _ from 'underscore';

@Component({
  selector: 'passed-homework',
  templateUrl: 'homework.html'
})

export class PassedHomework {

  public title : string = 'Homework';
  public homework = [];
  public students;
  public child;
  public currentPage = 1;
  public standardId;
  public NoHomework = false;
  constructor(private hw : HomeworkService,
              public parentInfo: ParentInfo,
              public nl: CustomService) {

  }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    this.standardId = this.parentInfo.getStudents()[0].standardId;
    this.child = this.students[0];
    this.getHomework();
  }

  selectChild(student) {
    this.standardId = student.standardId;
    this.getHomework();
  }

  getHomework() {
    this.nl.showLoader();
    this.hw.getOldHomeworkByStandard(this.standardId, this.currentPage).subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.nl.onError(err);
    });
  }

  onSuccess(res) {
    if (res.status === 204) {
      this.showEmptyMsg(true);
    } else {
      this.showEmptyMsg(false);
      this.homework = res;
      _.forEach(this.homework, (data) => {
        data.createdAt = ("0" + (new Date(data.createdAt).getDate())).slice(-2);
      });
    }
    this.nl.hideLoader();
  }

  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.loadMoreData(infiniteScroll);
    }, 500);
  }

  loadMoreData(infiniteScroll) {
    this.hw.getOldHomeworkByStandard(this.standardId, this.currentPage).subscribe((res) => {
      infiniteScroll.complete();
      this.loadDataSuccess(res);
    }, (err) => {
      infiniteScroll.complete();
      this.loadDataError(err);
    });
  }

  loadDataSuccess(res) {
    if (res.status === 204) {
      this.currentPage -= 1;
      return;
    }
    this.homework = this.homework.concat(res);
  }

  loadDataError(err) {
    this.currentPage -= 1;
    this.showEmptyMsg(false);
    this.nl.onError(err);
  }

  showEmptyMsg(val) {
    this.NoHomework = val;
  }

}
