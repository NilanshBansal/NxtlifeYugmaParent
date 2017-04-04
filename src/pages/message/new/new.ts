import { Component } from '@angular/core';

// import service
import { CustomService } from '../../service/custom.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'new-message',
  templateUrl: 'new.html'
})

export class NewMessagePage {

  public title: string = "New Message";

}