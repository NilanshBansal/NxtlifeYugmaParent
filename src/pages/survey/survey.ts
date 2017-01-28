import { Component,OnInit } from '@angular/core';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'page-about',
  templateUrl: 'survey.html',
  providers : [ SurveyService ] 
})

export class SurveyPage implements OnInit {

  public allsurveys = [{},{}];

  constructor(private _surveyServ : SurveyService ) { 

  }

  getSurveys(){

    this._surveyServ.getallsurveys()
    .subscribe( data => { this.allsurveys = data },
                () => console.log('allsurveys',this.allsurveys))
  }


  ngOnInit(){
    this.getSurveys();
  }

}
