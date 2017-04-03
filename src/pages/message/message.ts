import { Component } from '@angular/core';

// import service
import { CustomService } from '../../../service/custom.service';

@Component({
  selector: 'message',
  templateUrl: 'message.html'
})

export class MessagePage {

  public title: string = "Messaging";

}