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
    let indexx = this.radio.findIndex(a => a.questionId == questionId);
    if (indexx > -1) {
      this.radio.forEach((val, index) => {
        if (val.questionId === questionId) {
          this.radio.splice(index, 1);
          this.radio_init(questionId, optionId);
        }
      });
    } else {
      this.radio_init(questionId, optionId);
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
    this.checkbox.push(this.arr_init(queId, optId));
  }

  radio_init(queId, optId) {
    this.radio.push(this.arr_init(queId, optId));
  }

  arr_init(queId, optId) {
    let a = {
      questionId: queId,
      subOptionIds: [optId] 
    }
    return a;
  }

  findAndUpdate(index, optId) {
    let flag = 0;
    this.checkbox.forEach((val) => {
      val.subOptionIds.forEach((val1, i) => {
        if (val1 == optId) {
          val.subOptionIds.splice(i, 1);
          flag = 1;
        }
      });
    });
    if (flag == 0) {
      this.checkbox[index].subOptionIds.push(optId);
    }
  }

}