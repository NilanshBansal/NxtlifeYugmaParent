
import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../../service/survey.service';
import { NavController, ModalController, Events } from 'ionic-angular';
import { ViewSurvey } from '../view/view';
import { SurveyPage } from '../survey';
import { CustomService } from '../../../service/custom.service';
import { PouchDbService } from "../../../service/pouchdbservice";


@Component({
    selector: 'survey-list',
    templateUrl: 'survey-list.html'
})

export class SurveyListPage implements OnInit {

    public title: string = "Survey";
    public allsurveys;
    public onesurveys;
    public allData = [];
    public EmptySurveys: boolean = false;
    public currentPage = 1;
    public indexxx;

    constructor(private _surveyServ: SurveyService,
        private navCtrl: NavController,
        private nl: CustomService,
        private _event: Events,
        private modalCtrl: ModalController,
        public pouchdbservice: PouchDbService) {

        this.getSurveys();


    }

    getSurveys() {
        let that = this;
        this.nl.showLoader();
        this._surveyServ.getallsurveys(1)
            .subscribe(data => {
                this.nl.hideLoader();
                if (data.status == 204) {
                    this.EmptySurvey = true;
                } else {
                    this.allsurveys = data; console.log('surveys', this.allsurveys);
                    this.pouchdbservice.add(data, "sur_");
                }
            },
            (err) => {
                console.log('allsurveys', this.allsurveys);
                this.pouchdbservice.getAllComplaints("sur_").then(function (result) {
                    //that.allsurveys = result;
                    that.allsurveys=that.pouchdbservice.sortArray(result,"createdAt");
                });

            })
    }

    EmptySurvey: boolean = false;

    getParticularSurvey(surveyId, indexx) {
        console.log('indexx', indexx);
        this.indexxx = indexx;
        this.nl.showLoader();
        this._surveyServ.getOneSurvey(surveyId)
            .subscribe(data => {
                console.log(data);
                this.onesurveys = data; this.nl.hideLoader(); this.clickablesurvey(this.onesurveys, indexx);
                this.pouchdbservice.addSingleWithDelete(data,"surview_",data["surveyId"]);
            },(error) => {
                this.nl.onError(error);
                console.log('onesurveys', this.onesurveys);
                this.pouchdbservice.findDoc(surveyId,"surview_").then(function(doc){
                    this.onesurveys = doc;
                    this.clickablesurvey(this.onesurveys, indexx);
                });
            });
    }

    clickablesurvey(objj, indexx) {
        //    console.log('clickablesurvey');
        //    this.navCtrl.push(SurveyPage,{
        //        objj : objj
        //    });

        let modal4 = this.modalCtrl.create(ViewSurvey, { objj: objj, indexx: indexx });
        modal4.onDidDismiss((data) => {
            console.log(data);
            console.log("see obj: " ,objj);
            if (!data) { return; }
            this.allsurveys.splice(indexx, 1);
            let that=this;
            this.pouchdbservice.findDoc(objj["surveyId"],"sur_").then(function(doc){
                console.log("see doc: sur_ ",doc);
                that.pouchdbservice.deleteDoc(doc);
            });
            this.pouchdbservice.findDoc(objj["surveyId"],"surview_").then(function(doc){
                console.log("see doc: surview",doc);
                that.pouchdbservice.deleteDoc(doc);
            });
        })
        modal4.present();
    }



    doRefresh(refresher) {
        setTimeout(() => {
            this._surveyServ.getallsurveys(1).subscribe((res) => {
                this.onSuccess(res);
                this.pouchdbservice.add(res, "sur_");
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
        else {
            this.EmptySurveys = false;
            this.allsurveys = res;
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
                console.log('response', response);
                this.pouchdbservice.addWithoutDelete(response,"sur_");
                this.allsurveys = this.allsurveys.concat(response);
                // this.pop();
                infiniteScroll.complete();
            }, (err) => {
                this.currentPage -= 1;
                infiniteScroll.complete();
            });
        }, 1000);
    }


    ngOnInit(): void {

    }
}