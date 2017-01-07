import { Component,OnInit } from '@angular/core';
import { PollService } from '../../service/poll.service';


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


   PollChoiceClicked(id){
     console.log('clicked',id);
     this.OptionId = id;
   }
  ngOnInit() : void{
      this.PollFunc();
  }

}
