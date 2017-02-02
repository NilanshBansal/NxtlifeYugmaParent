import { Component , OnInit } from '@angular/core';
import { SurveyService } from '../../../service/survey.service';

@Component({
    selector : 'survey-list',
    templateUrl : 'survey-list.html'
})

export class SurveyListPage implements OnInit{

    public allsurveys;

    constructor(private _surveyServ : SurveyService ){
        this.getSurveys();
    }

    getSurveys(){
        this._surveyServ.getallsurveys()
            .subscribe( data => { this.allsurveys = data ; console.log('surveys',this.allsurveys);},
                () => console.log('allsurveys',this.allsurveys))
    }

    ngOnInit():void{
        
    }
}