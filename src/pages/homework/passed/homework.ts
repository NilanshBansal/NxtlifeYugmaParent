import { Component } from '@angular/core';
import { HomeworkService } from '../../../service/homework.service';
import { CustomService } from '../../../service/custom.service';
import { ParentInfo } from '../../../service/parentInfo';
import { PouchDbService } from '../../../service/pouchdbservice';
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
  monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  constructor(private hw : HomeworkService,
              public parentInfo: ParentInfo,
              public nl: CustomService,
              public pouchdbservice:PouchDbService) {

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
    let that=this;
    this.nl.showLoader();
    this.homework = [];
    this.currentPage = 1;
    this.hw.getOldHomeworkByStandard(this.standardId, this.currentPage).subscribe((res) => {
      console.log("see res: 11",res);
      this.onSuccess(res);
      this.pouchdbservice.add(res,"hwold_");
    }, (err) => {
      this.nl.onError(err);
      this.pouchdbservice.getAllComplaints("hwold_").then(function(result){
        var sortedResult=that.pouchdbservice.sortArray(result,"createdAt");
        //that.onSuccess(result);
        that.onSuccess(sortedResult);
      });
    });
  }

  onSuccess(res) {
    if (res.status === 204) {
      this.showEmptyMsg(true);
    } else {
      this.showEmptyMsg(false);
      this.homework = res;
      /*_.forEach(this.homework, (data) => {
        data.dueMonth = this.monthNames[(new Date(data.dueDate)).getMonth()];
        data.dueDate = ("0" + (new Date(data.dueDate).getDate())).slice(-2);
      });*/
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
    let newHomework = res;
    _.forEach(newHomework, (data) => {
      data.dueMonth = this.monthNames[(new Date(data.dueDate)).getMonth()];
      data.dueDate = ("0" + (new Date(data.dueDate).getDate())).slice(-2);
    });
    this.pouchdbservice.addWithoutDelete(newHomework,"hwold_");
    this.homework = this.homework.concat(newHomework);
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
