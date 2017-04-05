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
  public messages = [];
  commentForm: FormGroup;
  notPost = true;
  id;
  userId;

  constructor(private navParams: NavParams,
              private nl: CustomService,
              private messageService: MessageService) {
    this.commentForm = new FormGroup({
      message: new FormControl('', [Validators.required])
    });
    this.userId = localStorage.getItem("id");
  }

  ionViewWillEnter() {
    this.messages = this.navParams.get('message');
    this.id = this.navParams.get("id");
  }

  public postMessage() {
    console.log(this.commentForm.value);
    this.notPost = false;
    this.messageService.postMessage(this.id, this.commentForm.value).subscribe((res) => {
      this.notPost = true;
      this.messages.push({
        createdAt: new Date(),
        employeeName: null,
        message: this.commentForm.value.message,
        parentId: localStorage.getItem("id")
      });
      this.commentForm.reset();
    }, (err) => {
      this.nl.errMessage();
      this.notPost = true;
      this.commentForm.reset();
    });
  }

}