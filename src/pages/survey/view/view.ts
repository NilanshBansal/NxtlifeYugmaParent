import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'view-survey',
  templateUrl: 'view.html'
})

export class ViewSurvey implements OnInit {

  public survey: Object;
  public title: string = "Survey";
  radio = [];
  checkbox = [];

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    this.survey = this.navParams.get('objj');
  }

  save(data) {
    console.log(this.radio, this.checkbox)
  }

  onSelectionRadio(questionId, optionId, index) {
    let flag = 0;

    this.radio.forEach((val, index) => {
      if (val.questionId === questionId) {
        this.radio.splice(index, 1);
        flag = 1;
      }
    });

    if(flag = 1) {
      this.radio.push({
        questionId: questionId,
        subOptionsId: [optionId]
      });
    }

  }

  onSelectionCheckbox(questionId, optionId) {
    let index = this.checkbox.findIndex(a => a.questionId == questionId);
    if(index > -1) {
      this.findAndUpdate(index, optionId);
    } else {
      this.ckb_init(questionId, optionId);
    }
  }

  ckb_init(queId, optId) {
    this.checkbox.push({
      questionId: queId,
      subOptionsId: [optId]
    });
  }

  findAndUpdate(index, optId) {
    let flag = 0;
    this.checkbox.forEach((val) => {
      val.subOptionsId.forEach((val1, i) => {
        if (val1 == optId) {
          val.subOptionsId.splice(i, 1);
          flag = 1;
        }
      });
    });
    if (flag == 0) {
      this.checkbox[index].subOptionsId.push(optId);
    }
  }

}