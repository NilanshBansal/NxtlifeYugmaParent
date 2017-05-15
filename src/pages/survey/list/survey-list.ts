import { Component , OnInit } from '@angular/core';
import { SurveyService } from '../../../service/survey.service';
import { NavController,ModalController,Events } from 'ionic-angular';
import { ViewSurvey } from '../view/view';
import { CustomService } from '../../../service/custom.service';

@Component({
    selector : 'survey-list',
    templateUrl : 'survey-list.html'
})

export class SurveyListPage implements OnInit{

    public title: string = "Survey";
    public allsurveys;
    public onesurveys;
    public allData = [];
    public EmptySurveys : boolean = false;
    public currentPage = 1;
    public indexxx;

    constructor(private _surveyServ : SurveyService ,
                private navCtrl : NavController,
                private nl : CustomService ,
                private _event : Events , 
                private modalCtrl : ModalController){
         this.getSurveys();
         this._event.subscribe('survey:done',
                     (data) => {console.log("DSFFDF", data); this.surveyDoneSplice(data);})

         
    }

    surveyDoneSplice(data){
        this.allsurveys.splice(data,1);
    }

    getSurveys(){
        this.nl.showLoader();
        this._surveyServ.getallsurveys(1)
            .subscribe( data => { this.allsurveys = data ; this.nl.hideLoader();  console.log('surveys',this.allsurveys);},
                () => console.log('allsurveys',this.allsurveys))
    }

    getParticularSurvey(surveyId,indexx){
        console.log('indexx',indexx);
        this.indexxx = indexx;
        this._surveyServ.getOneSurvey(surveyId)
        .subscribe( data => { this.onesurveys = data ; this.clickablesurvey(this.onesurveys,indexx)},
              () => console.log('onesurveys',this.onesurveys))
    }

   clickablesurvey(objj,indexx){
    //    console.log('clickablesurvey');
    //    this.navCtrl.push(SurveyPage,{
    //        objj : objj
    //    });

       let modal4 = this.modalCtrl.create(ViewSurvey,{ objj : objj , indexx : indexx});
       modal4.present();
   }



 doRefresh(refresher) {
    setTimeout(() => {
         this._surveyServ.getallsurveys(1).subscribe((res) => {
                this.onSuccess(res);
                refresher.complete();
            }, (err) => {
                refresher.complete();
                 this.onError(err);
            });
        }, 500);
     }

    onSuccess(res) {
        this.nl.hideLoader();
            if (res.status === 204) {
             this.EmptySurveys = true;
            }
            else{
                this.EmptySurveys = false;
                this.allData = res;
           }
     }

    onError(err) {
       this.nl.onError(err);
    }


     doInfinite(infiniteScroll) {
         this.currentPage += 1;
          setTimeout(() => {
            this._surveyServ.getallsurveys(this.currentPage).subscribe(response => {
              if (response.status === 204) {
                this.currentPage -= 1;
                infiniteScroll.complete();
                return;
              }
              console.log('response',response);
              this.allsurveys = this.allsurveys.concat(response);
             // this.pop();
              infiniteScroll.complete();
            }, (err) => {
              this.currentPage -= 1;
              infiniteScroll.complete();
            });
          }, 1000);
    }


    ngOnInit():void{

    }
}
