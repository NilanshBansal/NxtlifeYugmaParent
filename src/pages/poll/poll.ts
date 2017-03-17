import { Component,OnInit } from '@angular/core';
import { PollService } from '../../service/poll.service';
import * as _ from 'underscore';
import { CustomService } from '../../service/custom.service';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';


@Component({
  selector: 'page-about',
  templateUrl: 'poll.html',
  providers : [PollService]
})

export class PollPage implements OnInit {

  public datas;
  public resdata = [] ;
  public responseData;
  public theItem;
  public allData;
  public currentPage = 1;
  public enabllle = [];
  public title: string = "poll";
  
  //public pollVote : FormGroup;
  constructor(private pollServ : PollService,
              private nl : CustomService) {


              

   }

public EmptyPolls = false;
public choice1 = [];
public choice2 = [];
  POllLastFunction(){
    this.GetLengthPoll();
    for(let i=0; i< this.pollLength; i++){
       this.choice1[i]=[];
       this.choice2[i]= [];
     this.enabllle[i] = true;
       
    }
    console.log('this.pollLength',this.pollLength);
  }


  PollFunc(){
    this.nl.showLoader();
    this.pollServ.GetPolls().subscribe((datas) =>
      {  console.log('Polls',datas);
        if (datas.status === 204) {
        this.EmptyPolls = true;
    //    this.nl.hideLoader();
        console.log('Polls',this.EmptyPolls);
      } else{
      this.resdata = datas; this.POllLastFunction(); console.log('data') } this.nl.hideLoader()},
      //(err) => {console.log('err'); this.nl.hideLoader()},
      () => console.log('Polls',this.resdata)
    )};

public pollLength;
  GetLengthPoll(){
    this.pollLength=this.resdata.length;
    console.log('pollLength',this.pollLength);
  }

  RemoveItem(theItem) {
   // console.log('theItem',theItem);
   // let index = this.resdata.indexOf(theItem);
   // console.log('index',index);
    this.resdata.splice(theItem,1);
}


 

  public PollResult;
  public OptionId;

  public resID;
    PollMulVoting(resid,i,res){
      console.log('pollmul res',res);
      
      this.resID = resid;
     this.PollResult = {
       "pollId" : this.resID,
       "optionIds" : _.without(this.choice1[i],undefined)
     };
     this.pollServ.PollVote(this.PollResult).subscribe(
       data => { this.responseData = data ; this.RemoveItem(i); },
       () => console.log(this.responseData),
       )
   }


   public pollIDD;
   PollChoiceClicked(id,pollid){
    // this.Count += 1;
   // this.buttonEnable(id,pollid);
     this.enable = false;
     console.log('clicked',id);
     console.log('poll id',pollid);
     this.pollIDD = pollid;
     this.OptionId = id;
   }

   public MultipleArray = [];
   public Count = 0;
   public checkItems = {};

    public arrayy = [];
    public enable = true;
    public enablle = true

    buttonEnable(i,c,id,pollid){
      console.log('i',i);
     console.log('c',c);
       //this.enablle = false;
//   this.pollIDD = pollid;
//this.OptionId = id;



    //  this.PollChoiceMultiple();

      if(!this.choice2[i].includes(true) ){
        this.enabllle[i] = true;
      }
      else{
       this.enabllle[i] = false;
      }

      //   if(this.enabllle.indexOf(true) === -1){
      //   this.enabllle[i] = true;
      // }else{
      //   this.enabllle[i] = false;
      // }


        if(this.choice2[i][c]){
            this.choice1[i][c] = this.resdata[i].subOptions[c].id;
          }
          else{
            this.choice1[i].splice(c,1);
          }

        console.log('this.choice2[i][c]',this.choice2[i][c]);
      //   console.log('this.choice2[i][c]',this.choice2[i][c]);

        // if(this.choice2[i][c] == true)
        // {
        //   this.arrayy.push(this.resdata[i].subOptions[c].id);
        //   console.log(this.arrayy);
        // }
        // else{
        //   this.arrayy.pop();
        // }
    }


 public counntt =0 ;
    singleChoice(i,c,did,pollid){

      this.enabllle[i] = false;
    //   this.resID = pollid;
    //   if(  this.counntt == 0){
    //   this.arrayy.push(did);
    // }
    // else{
    //   this.arrayy.pop();
    //   this.arrayy.push(did);
    // }

    }
  //  PollChoiceMultiple(){
  //    this.arrayy = [];
  //    for(let i in this.checkItems){
  //        console.log('checkItems',this.checkItems[i]);
  //      if(this.checkItems[i] == true) {
  //       if(this.pollIDD == this.checkItems[i]){
  //         console.log('pollid matched');

  //       }
  //        this.arrayy.push(i);
  //      }
  //    }
  //   console.log(this.arrayy);
  // }

  doRefresh(refresher) {
            setTimeout(() => {
                this.pollServ.GetPolls().subscribe((res) => {
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
            this.EmptyPolls = true;
            } else {
            this.EmptyPolls = false;
            this.allData = res;
            }
     }

    onError(err) {
        this.nl.onError(err);
    }   
  

  ngOnInit() : void{

     this.PollFunc();
    // this.POllLastFunction();
  }

}
