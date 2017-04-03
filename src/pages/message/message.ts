import { Component } from '@angular/core';

// import service
import { CustomService } from '../../service/custom.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'message',
  templateUrl: 'message.html'
})

export class MessagePage {

  public title: string = "Messaging";
  public emptyMessages: boolean = false;

  constructor(public messageService: MessageService,
              public nl: CustomService) {

  }

  ionViewWillEnter() {
    this.nl.showLoader();
    this.messageService.getAllMessages().subscribe((res) => {
      console.log("QQQ", res);
      if (res.status === 204) {
        this.emptyMessages = true;
      } else {
        this.emptyMessages = false;
      }
      this.nl.hideLoader();
    }, (err) => {
      console.log("err", err);
      this.onError(err);
    })
  }

  public onError(err) {
    this.nl.onError(err);
  }

}