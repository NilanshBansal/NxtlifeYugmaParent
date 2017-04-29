import { Component } from '@angular/core';
import { PollService } from '../../service/poll.service';
import * as _ from 'underscore';
import { CustomService } from '../../service/custom.service';

@Component({
  selector: 'page-about',
  templateUrl: 'poll.html',
})

export class PollPage {

  public polls = [];
  public EmptyPolls:boolean = false;
  public baseUrl: string;
  public currentPage = 1;
  public enabllle = [];
  public choice1 = [];
  public choice2 = [];
  public title: string = "poll";

  constructor(private nl: CustomService,
              private pollService: PollService) {
  }

  ionViewWillEnter() {
    this.getPolls();
    this.baseUrl = localStorage.getItem("fileUrl") + "/";
  }

  public getPolls() {
    this.nl.showLoader();
    this.pollService.GetPolls().subscribe((data) => {
      if (data.status === 204) {
        this.EmptyPolls = true;
      } else {
        this.onSuccess(data);
      }
    },(err) => {
      this.onError(err);
    });
  }

  public onSuccess(data) {
    this.nl.hideLoader();
    if (data.status === 204) {
      this.EmptyPolls = true;
    } else {
      this.EmptyPolls = false;
      this.polls = data;
      this.buildData();
    }
  }

  public buildData() {
    let pollLength = this.polls.length;
    for (let i = 0; i < pollLength; i++) {
      this.choice1[i] = [];
      this.choice2[i] = [];
      this.enabllle[i] = true;
    }
  }

  public onError(err) {
    this.nl.onError(err);
  }

  public doRefresh(refresher) {
    setTimeout(() => {
      this.pollService.GetPolls().subscribe((res) => {
        this.onSuccess(res);
        refresher.complete();
      }, (err) => {
        refresher.complete();
        this.onError(err);
      });
    });
  }

  public removeItem(item) {
    this.polls.splice(item, 1);
  }

  public pollMulVoting(resid, i, res) {
    let PollResult = {
      "pollId": resid,
      "optionIds": _.without(this.choice1[i], undefined)
    };
    this.pollService.PollVote(PollResult).subscribe((data) => {
      this.removeItem(i);
    }, (err) => {
      this.onError(err);
    })
  }
  
  public buttonEnable(i, c, id, pollid) {
    if (!this.choice2[i].includes(true)) {
      this.enabllle[i] = true;
    }
    else {
      this.enabllle[i] = false;
    }
    if (this.choice2[i][c]) {
      this.choice1[i][c] = this.polls[i].subOptions[c].id;
    }
    else {
      this.choice1[i].splice(c, 1);
    }
  }

  public singleChoice(i, c, did, pollid) {
    this.enabllle[i] = false;
  }

}
