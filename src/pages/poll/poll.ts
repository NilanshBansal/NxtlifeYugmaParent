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
     console.log('clicked',id);
     this.OptionId = id;
   }

   public MultipleArray = [];
   public Count = 0;
   public checkItems = {};

    public arrayy = [];
   PollChoiceMultiple(){


     
     for(let i in this.checkItems){
         console.log(this.checkItems[i]);
       if(this.checkItems[i] == true) {
         this.arrayy.push(i);
       }
     }

 console.log(this.arrayy);
}
     //this.MultipleArray.push(id);
    //this.MultipleArray= _.uniq(this.MultipleArray);
 //this.OddOccurences();

  
  OddOccurences(){
  //       for (let i=0; i < this.MultipleArray.length; i++) {
  //       this.Count = this.Count ^ this.MultipleArray[i];
  //  }
  //    return this.Count;
 // let s = 0;
  //  console.log('odd',_.map([1, 2, 3,2,3,1,2], function(num){ return num ^ s; }));
  console.log((_.countBy([5, 5, 2, 2, 2, 2, 2, 9, 4], _.identity)));
  let zx = _.countBy([5, 5, 2, 2, 2, 2, 2, 9, 4], _.identity);
  let xz = _.values(zx );
  let re = _.keys(zx);
  
  console.log(re);
  for(let i=0;i<xz.length;i++){
    if(xz[i] % 2 == 0){
    console.log('xz', xz[i])

  }
  }
  }


    //  this.Count += 1;

    // for(let i=0;i<this.MultipleArray.length ; i++){
      
    //   if(_.contains(this.MultipleArray,this.MultipleArray[i])){
       
    //   if(this.Count > 1){ 
    //     this.MultipleArray.pop();
    //     console.log('count',this.Count);
    //      console.log('Pop Array',this.MultipleArray);
    //      }
    //      else{
    //        this.MultipleArray.push(id);
    //         console.log('Push Array',this.MultipleArray);
    //      }
    //   }
      
    // }
     
   

  ngOnInit() : void{
      this.PollFunc();
  }

}
