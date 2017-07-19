import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../../../service/homework.service';
import { CustomService } from '../../../service/custom.service';
import { ParentInfo } from '../../../service/parentInfo';
import * as _ from 'underscore';
import { FileOpener } from '@ionic-native/file-opener';


@Component({
  selector: 'current-homework',
  templateUrl: 'homework.html'
})

export class CurrentHomework implements OnInit {

  public title : string = 'Homework';
  public homework = [];
  public students;
  public child;
  public currentPage = 1;
  public standardId;
  public NoHomework = false;
  public baseUrl = localStorage.getItem("fileUrl") + "/";
  monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  constructor(private hw : HomeworkService,
              public parentInfo: ParentInfo,
              public nl: CustomService,
              private fileOpener: FileOpener) {

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
    this.homework = [];
    this.currentPage = 1;
    this.hw.getHomeworkByStandard(this.standardId, this.currentPage).subscribe((res) => {
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
        data.dueMonth = this.monthNames[(new Date(data.dueDate)).getMonth()];
        data.dueDate = ("0" + (new Date(data.dueDate).getDate())).slice(-2);
      });
    }
    console.log(this.homework)
    this.nl.hideLoader();
  }

  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.loadMoreData(infiniteScroll);
    }, 500);
  }

  loadMoreData(infiniteScroll) {
    this.hw.getHomeworkByStandard(this.standardId, this.currentPage).subscribe((res) => {
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


  viewPdf(path){
    console.log(this.baseUrl + path);
    /*this.fileOpener.open(this.baseUrl + path, 'application/pdf')
  .then(() => alert('File is opened'))
  .catch(e => alert(e));*/
 // window.open('https://www.googleapis.com/download/storage/v1/b/srgs-blr/o/homework%2f7985433226911368073Test.pdf?alt=media', '_system');
  window.open(this.baseUrl + path, '_system');
  
}



}