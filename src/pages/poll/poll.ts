import { Component,OnInit } from '@angular/core';
import { PollService } from '../../service/poll.service';
import * as _ from 'underscore';


@Component({
  selector: 'page-about',
  templateUrl: 'poll.html',
  providers : [PollService]
})

export class PollPage implements OnInit {

  public resdata = [];
  public responseData;
  public theItem;
  constructor(private pollServ : PollService) {

   }


  PollFunc(){
    this.pollServ.GetPolls().subscribe(
      data => { this.resdata = data ;},
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
