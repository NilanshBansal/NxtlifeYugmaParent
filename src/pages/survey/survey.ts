import { Component,OnInit } from '@angular/core';
import { SurveyService } from '../../service/survey.service';
import { NavParams,ToastController , ActionSheetController } from 'ionic-angular';
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
              private _toastCtrl : ToastController,
              private actionSheetCtrl : ActionSheetController) { 


                                 
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
    console.log('questionId',questionID)
     this.surveyResult = { 

                           "surveyId" : resid,
                           "surveyAnswers":[
                             this.initSurveyResult(resid,questionID)
                    ]}

    this._surveyServ.PostSurveys(this.surveyResult)
      .subscribe( data => { this.surveys = data})

      console.log(this.surveyResult);
  }

  public abc;
  initSurveyResult(resid,questionID){
          this.abc =    {
             "questionId" : questionID,
             "subOptionIds" :[this.OptionId]
          }                 

        this.surveyResult.surveyAnswers.push(this.abc);
      //  console.log(this.surveyResult.surveyAnswers);

        //for(let i=0; )
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


   	presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
		title: 'Are you sure you want to submit?',
		buttons: [
			{
			text: 'Submit',
			role: 'submit',
			handler: () => {
		//		this.postMessage(this.newEvent);
//this.SurveyVoting(resid,questionID,res);
			}
			},{
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
				console.log('Cancel clicked');
			}
		}]
    });
    actionSheet.present();
  }

  ngOnInit(){}
    //this.postSurveys();
  
}
