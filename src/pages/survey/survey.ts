import { Component,OnInit } from '@angular/core';
import { SurveyService } from '../../service/survey.service';
import { NavParams,ToastController } from 'ionic-angular';
import { Validators , FormGroup ,FormControl , FormBuilder } from '@angular/forms';

@Component({
  selector: 'survey-component',
  templateUrl: 'survey.html',
  providers : [ SurveyService ] 
})

export class SurveyPage implements OnInit {

  public title:string = "Survey";
  public allsurveys = [{},{}];
  public onesurveys;
  public surveys ;
  public body; 
  public surveyResult;
  public options = [];
  public OptionId;
  public surveyResult2 : FormGroup;   

  constructor(private _surveyServ : SurveyService ,
              private navparams : NavParams ,
              private _toastCtrl : ToastController) { 


                                 
      //  this.surveyResult2  = new  FormGroup({
      //      "surveyId" : new FormControl(''),
      //      "surveyAnswers" : 
      //          })   


    this.options = [];

   this.onesurveys = this.navparams.get('objj');
   console.log('onesurveys',this.onesurveys);
  }

  // getSurveys(){
  //   this._surveyServ.getallsurveys()
  //   .subscribe( data => { this.allsurveys = data },
  //               () => console.log('allsurveys',this.allsurveys))
  // }

  
  
  
  // removing survey after submiting.
//   RemoveItem(theItem) {
//     console.log('theItem',theItem);
//     let index = this.resdata.indexOf(theItem);
//     console.log('index',index);
//     this.resdata.splice(index,1);
// }

  
  SurveyVoting(resid,questionID,res){
    console.log('resssSurvey',res);
     this.surveyResult = { 

                           "surveyId" : resid,
                           "surveyAnswers":[
                              {
                                "questionId" : questionID,
                                "subOptionIds":[this.OptionId]
                              }
                       ]}

    this._surveyServ.PostSurveys(this.surveyResult)
      .subscribe( data => { this.surveys = data})
  }




  enable = true;

  SurveyChoiceClicked(id,qid){
    // this.Count += 1;
     this.enable = false;
     console.log('clicked',id ,qid);
      this.OptionId = id;
   }

   toast(){
      let toaste = this._toastCtrl.create({
            message: 'Event deleted successfully',
             duration: 3000
          });
        toaste.present();
        console.log('toast');
   }

  ngOnInit(){}
    //this.postSurveys();
  
}
