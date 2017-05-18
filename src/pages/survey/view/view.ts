import { Component, OnInit, DoCheck } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'view-survey',
  templateUrl: 'view.html'
})

export class ViewSurvey implements OnInit, DoCheck {

  public survey: Object;
  public title: string = "Survey";
  public radio = [];
  public checkbox = [];
  public sur_data = [];
  public btnDisable: boolean = true;

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    this.survey = this.navParams.get('objj');
  }

  ngDoCheck() {
    console.log("Ds");
    if(this.radio || this.checkbox) {
      this.doSomething();
    }
  }

  doSomething() {
    let sur_data = this.radio.concat(this.checkbox);
    console.log("a", sur_data);
    if(this.survey["questions"].length === sur_data.length) {
      let check;
      sur_data.forEach((val) => {
        console.log("sasas", val.subOptionIds)
        if(val.subOptionIds.length != 0) {
          check = true;
        } else {
          check= false;
        }
      });
      if(check) {
        this.btnDisable = false;
      } else {
        this.btnDisable = true;
      }
    }
  }

  save(data) {
    let a = this.radio.concat(this.checkbox);
    console.log(a);
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