import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../../../service/homework.service';
import { CustomService } from '../../../service/custom.service';

@Component({
  selector: 'homework-parent',
  templateUrl: 'homework.html'
})


export class CurrentHomework implements OnInit {

  public title : string = 'Homework';
  public homework = [];

  constructor(private hw : HomeworkService,
              public nl: CustomService) {

  }

  ngOnInit() {
    this.getHomework();
  }

  getHomework() {
    this.nl.showLoader();
    this.hw.getHomeworkByStandard("4").subscribe((res) => {
      this.nl.hideLoader();
      this.homework = res;
    }, (err) => {
      this.nl.onError(err);
    });
  }

}
