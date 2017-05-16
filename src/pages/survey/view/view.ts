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

}