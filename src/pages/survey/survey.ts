import { Component,OnInit } from '@angular/core';
import { SurveyService } from '../../service/survey.service';
import { NavParams,ToastController ,NavController , Events,  ActionSheetController ,ViewController} from 'ionic-angular';
import { Validators , FormGroup ,FormControl , FormBuilder } from '@angular/forms';
import * as _ from 'underscore';

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
  public choice2;
 public indxx;
 public enabllle = [];
  choice3;

  constructor(private _surveyServ : SurveyService ,
              private navparams : NavParams ,
              private navCtrl : NavController,
              private _toastCtrl : ToastController,
              private viewCtrl : ViewController,
              private _event  : Events ,
              private actionSheetCtrl : ActionSheetController) { 
this.onesurveys = this.navparams.get('objj');
 this.indxx = this.navparams.get('indexx');
   console.log('onesurveys',this.onesurveys);
   console.log('this.indxx ',this.indxx );
//this.choice2[0] = [];
                                 
      //  this.surveyResult2  = new  FormGroup({
      //      "surveyId" : new FormControl(''),
      //      "surveyAnswers" : 
      //          })   


    this.options = [];
    this.choice2 = [];


    this.choice3 = [];

   for(let i=0; i < this.onesurveys.questionLength;i++){
      this.choice2[i]=[];
      this.choice3[i]=[];
      this.enabllle[i]= false;
   }

   console.log('questionlength',this.onesurveys.questionLength);
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

  relationship =[{
    
  }];

  
  public arrayy = [];
 choice1 = [];

  SurveyVoting(resid,res){
console.log(this.choice3);
 console.log('relationship',this.relationship);
  console.log('choice2',this.choice2);

    console.log('resssSurvey',res);
    let surveyAnswers = [];
    let surveyAnswer;
   // console.log('questionId',questionID)
        for(let i=0; i < this.onesurveys.questionLength;i++)
       {
         surveyAnswer = {};
         console.log("question Id : ",this.onesurveys.questions[i]['questionId']);
          surveyAnswer['questionId'] = this.onesurveys.questions[i]['questionId'];
          surveyAnswer['subOptionIds'] = _.without(this.choice3[i],undefined);
          surveyAnswers.push(surveyAnswer);
       }
     this.surveyResult = { 

                           "surveyId" : resid,
                           "surveyAnswers":surveyAnswers
                  }

    this._surveyServ.PostSurveys(this.surveyResult)
      .subscribe( data => { this.surveys = data;  this.afterSubmitSurvey(); })

      console.log('surveyResult',this.surveyResult);
  }


afterSubmitSurvey(){
    this.toast();
    this._event.publish('survey:done', this.indxx);
    this.viewCtrl.dismiss();
   // this.viewCtrl.onDidDismiss((data) => {  });
}

 public enablle = true
 //public enabllle = [];

  questionclick(i){
    this.enabllle[i] = true;

    if(this.enabllle.indexOf(false)===-1){
      this.enablle = false;
    }else{
      this.enablle = true;
    }
    //if()
  }

  public abc;
  initSurveyResult(resid,questionID){
        for(let i=0; i < this.onesurveys.questionLength;i++)
       {
          console.log('tip top');
       } 
 }

public checkItems = {};

  enable = true;
  QuestionIdd ;
  SurveyChoiceClicked(i,m,id,qid){
   
    if(!this.choice2[i].includes(true) ){
        this.enabllle[i] = false;
    }
    else{
      this.enabllle[i] = true;
    }

  if(this.enabllle.indexOf(false) === -1){
        this.enablle = false;
      }else{
        this.enablle = true;
      }

    console.log('this.choice2[i][m]',this.choice2[i][m]);
      if(this.choice2[i][m]){
        this.choice3[i][m] = this.onesurveys.questions[i].options[m].id;
      }
      else{
        this.choice3[i].splice(m,1);
      }

    // this.Count += 1;
     this.enable = false;
     console.log('clicked',id ,qid);
      this.OptionId = id;
      this.QuestionIdd = qid;
   }

   toast(){
      let toaste = this._toastCtrl.create({
            message: 'Survey Submitted Successfully',
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
