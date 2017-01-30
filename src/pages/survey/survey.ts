import { Component,OnInit } from '@angular/core';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'survey-component',
  templateUrl: 'survey.html',
  providers : [ SurveyService ] 
})

export class SurveyPage implements OnInit {

  public allsurveys = [{},{}];
  public surveys ;
  public body; 
  public surveyResult;

  constructor(private _surveyServ : SurveyService ) { 

    this.surveyResult = { 
                            

                        }

  }

  getSurveys(){
    this._surveyServ.getallsurveys()
    .subscribe( data => { this.allsurveys = data },
                () => console.log('allsurveys',this.allsurveys))
  }

  postSurveys(){
    this._surveyServ.PostSurveys(this.body)
      .subscribe( data => { this.surveys = data})
  }

  ngOnInit(){
    this.getSurveys();
  }

}
