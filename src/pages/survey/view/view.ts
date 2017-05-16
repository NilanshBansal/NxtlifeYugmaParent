import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'view-survey',
  templateUrl: 'view.html'
})

export class ViewSurvey implements OnInit {

  public survey: Object;
  public title: string = "Survey";
  public selectLocationName;
  public selectStatus;
  public selectedStatus;

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    this.survey = this.navParams.get('objj');
    console.log(this.survey)
  }

  aa(id) {
    this.selectedStatus = id;
    console.log(id)
  }

  save(data) {
    console.log(this.sur)
  }

  selectedEntry;
  radio = [];
  sur;

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
        subOptionsId: optionId
      });
    }

    console.log(this.radio)
  }

  checkbox = [];
  ckb_opt = [];

  onSelectionCheckbox(questionId, optionId, index) {
    let indexxx = this.checkbox.findIndex(a => a.questionId == questionId);
    let flag = 0;
    if(indexxx > -1) {
      this.checkbox.forEach((val, i) => {
        val.subOptionsId.forEach((val1, ii) => {
          if (val1 == optionId) {
            val.subOptionsId.splice(ii, 1);
            flag = 1;
          }
        })
      });
      if (flag == 0) {
        this.checkbox[indexxx].subOptionsId.push(optionId);
      }
    } else {
      this.checkbox.push({
        questionId: questionId,
        subOptionsId: [optionId]
      });
    }
    console.log("DSDS", this.checkbox, this.ckb_opt);
  }

}