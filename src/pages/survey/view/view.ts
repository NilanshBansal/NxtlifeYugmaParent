import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { CustomService } from '../../../service/custom.service';
import { ActionSheetController, ViewController } from 'ionic-angular';
import { SurveyService } from '../../../service/survey.service';

@Component({
  selector: 'view-survey',
  templateUrl: 'view.html'
})

export class ViewSurvey implements OnInit {

  public survey: Object;
  public title: string = "Survey";
  public radio = [];
  public checkbox = [];

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private surveyService: SurveyService,
              private actionSheetCtrl: ActionSheetController,
              private nl: CustomService) {

  }

  ngOnInit() {
    this.survey = this.navParams.get('objj');
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

    save(data) {
    let a = this.radio.concat(this.checkbox);
    if(this.radio || this.checkbox) {
      if(this.survey["questions"].length === a.length) {
        this.doSomething(a);
      } else {
        this.nl.showToast("All fields are required to submit form");
      }
    }
  }

  doSomething(data) {
    let hasCheck = false;
    data.forEach((val, index) => {
      if (val.subOptionIds.length == 0) {
        hasCheck = true;
      }
    });
    if (hasCheck) {
      this.nl.showToast("All fields are required to submit form");
    } else {
      this.presentActionsheet(data);
    }
  }

  presentActionsheet(data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'YES',
        icon: 'ios-paper-outline',
        handler: () => {
          this.nl.showLoader();
          this.surveyService.PostSurveys(data).subscribe((res) => {
            console.log("res", res);
            this.nl.hideLoader();
            this.viewCtrl.dismiss();
          }, (err) => {
            this.nl.onError(err);
            this.viewCtrl.dismiss();
          })
        }
      }, {
        text: 'CANCEL',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

}