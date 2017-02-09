import { Component , OnInit } from '@angular/core';
import { SurveyService } from '../../../service/survey.service';
import { NavController } from 'ionic-angular';
import { SurveyPage } from '../survey';

@Component({
    selector : 'survey-list',
    templateUrl : 'survey-list.html'
})

export class SurveyListPage implements OnInit{

    public title: string = "Survey";
    public allsurveys;
    public onesurveys;
    constructor(private _surveyServ : SurveyService ,
                private navCtrl : NavController ){
        this.getSurveys();
    }

    getSurveys(){
        this._surveyServ.getallsurveys()
            .subscribe( data => { this.allsurveys = data ; console.log('surveys',this.allsurveys);},
                () => console.log('allsurveys',this.allsurveys))
    }

    getParticularSurvey(surveyId){
        this._surveyServ.getOneSurvey(surveyId)
        .subscribe( data => { this.onesurveys = data ; this.clickablesurvey(this.onesurveys)},
              () => console.log('onesurveys',this.onesurveys))
    }

   clickablesurvey(objj){
       console.log('clickablesurvey');
       this.navCtrl.push(SurveyPage,{
           objj : objj
       });
   }

    ngOnInit():void{
        
    }
}