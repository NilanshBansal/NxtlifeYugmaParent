import { Component,OnInit } from '@angular/core';
import { PollService } from '../../service/poll.service';
import * as _ from 'underscore';
import { CustomService } from '../../service/custom.service';

@Component({
  selector: 'page-about',
  templateUrl: 'poll.html',
  providers : [PollService]
})

export class PollPage implements OnInit {

  public datas;
  public resdata = [];
  public responseData;
  public theItem;
  constructor(private pollServ : PollService,
              private nl : CustomService) {

   }

public EmptyPolls = false;

  PollFunc(){
    this.nl.showLoader();
    this.pollServ.GetPolls().subscribe((datas) =>
      {  console.log('emptyPolls',datas);
        if (datas.status === 204) {
        this.EmptyPolls = true;
    //    this.nl.hideLoader();
        console.log('emptyPolls',this.EmptyPolls);
      } else{
      this.resdata = datas.json() ; console.log('data') } this.nl.hideLoader()},
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

     //this.enable = false;

     for(let i in this.checkItems){
         console.log(this.checkItems[i]);
       if(this.checkItems[i] == true) {
         this.arrayy.push(i);
       }
     }

 console.log(this.arrayy);
}


  ngOnInit() : void{
      this.PollFunc();
  }

}
