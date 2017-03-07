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
  //public pollVote : FormGroup;
  constructor(private pollServ : PollService,
              private nl : CustomService) {


   }

public EmptyPolls = false;



  PollFunc(){
    this.nl.showLoader();
    this.pollServ.GetPolls().subscribe((datas) =>
      {  console.log('Polls',datas);
        if (datas.status === 204) {
        this.EmptyPolls = true;
    //    this.nl.hideLoader();
        console.log('Polls',this.EmptyPolls);
      } else{
      this.resdata = datas; console.log('data') } this.nl.hideLoader()},
      //(err) => {console.log('err'); this.nl.hideLoader()},
      () => console.log('Polls',this.resdata)
    )};

  RemoveItem(theItem) {
    console.log('theItem',theItem);
    let index = this.resdata.indexOf(theItem);
    console.log('index',index);
    this.resdata.splice(index,1);
}


  // CheckIndex(res){
  //    this.RemoveItem(res);
  // }

  public PollResult;
  public OptionId;

   PollVoting(resid,res){
     this.PollResult = {
       "pollId" : resid,
       "optionIds" : [this.OptionId]
     };
     this.pollServ.PollVote(this.PollResult).subscribe(
       data => { this.responseData = data ; this.RemoveItem(res); },
       () => console.log(this.responseData),
       )
   }


    PollMulVoting(resid,res){
      console.log('pollmul res',res);
      this.PollChoiceMultiple();

     this.PollResult = {
       "pollId" : resid,
       "optionIds" : this.arrayy
     };
     this.pollServ.PollVote(this.PollResult).subscribe(
       data => { this.responseData = data ; this.RemoveItem(res); },
       () => console.log(this.responseData),
       )
   }


   PollChoiceClicked(id){
    // this.Count += 1;

     this.enable = false;
     console.log('clicked',id);
     this.OptionId = id;
   }

   public MultipleArray = [];
   public Count = 0;
   public checkItems = {};

    public arrayy = [];
    public enable = true;
    public mul_enable = true;

    buttonEnable(){
       this.mul_enable = false;
    }

   PollChoiceMultiple(){
     this.arrayy = [];
     for(let i in this.checkItems){
         console.log('checkItems',this.checkItems[i]);
       if(this.checkItems[i] == true) {
         this.arrayy.push(i);
       }
     }
    console.log(this.arrayy);
  }

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
  
  }

}
