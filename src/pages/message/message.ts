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

  constructor(public messageService: MessageService,
              public nl: CustomService) {

  }

  ionViewWillEnter() {
    this.nl.showLoader();
    this.messageService.getAllMessages().subscribe((res) => {
      console.log("QQQ", res);
    }, (err) => {
      console.log("err", err);
      this.onError(err);
    })
  }

  public onError(err) {
    this.nl.onError(err);
  }

}