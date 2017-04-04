import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewController, NavParams } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { MessageService } from '../../../service/message.service';
import { ParentInfo } from '../../../service/parentInfo';

@Component({
  selector: 'view-message',
  templateUrl: 'view.html'
})

export class ViewMessagePage {

  public headerTitle: string = "Messages";
  public messages = 0;
  commentForm: FormGroup;
  notPost = true;
  id;

  constructor(private navParams: NavParams,
              private messageService: MessageService) {
    this.commentForm = new FormGroup({
      message: new FormControl('', [Validators.required])
    });
  }

  ionViewWillEnter() {
    this.messages = this.navParams.get('message');
    this.id = this.navParams.get("id");
  }

  public postMessage() {
    console.log(this.commentForm.value)
    this.messageService.postMessage(this.id, this.commentForm.value).subscribe((res) => {

    })
  }

}