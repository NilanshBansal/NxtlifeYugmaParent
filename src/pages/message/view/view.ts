import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewController, NavParams, Content } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { MessageService } from '../../../service/message.service';
import { ParentInfo } from '../../../service/parentInfo';
import { CommonService } from '../../../service/common.service'; 

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

  @ViewChild(Content) content: Content;

  constructor(private navParams: NavParams,
              private nl: CustomService,
              public commonService: CommonService,
              private messageService: MessageService) {
    this.initForm();
    this.getData();
    this.sockJsConnection();
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(300);
  }

  public initForm() {
    this.commentForm = new FormGroup({
      message: new FormControl('', [Validators.required])
    });
  }

  public getData() { 
    this.messages = this.navParams.get('message');
    this.id = this.navParams.get("id");
  }

  public sockJsConnection() {
    let stompClient = this.commonService.getSockJs();
    let url = '/parent/conversation/'+ this.id +'/message';
    let that = this;
    stompClient.connect({}, function (frame) {
       stompClient.subscribe(url, function (greeting) {
          let message = JSON.parse(greeting.body);
          if (!message) {
            return;
          }
          that.messages.push(message);
          that.content.scrollToBottom(300);
       });
    });
  }

  public postMessage() {
    this.notPost = false;
    this.messageService.postMessage(this.id, this.commentForm.value).subscribe((res) => {
      this.notPost = true;
      this.messages.push({
        createdAt: new Date(),
        employeeId: null,
        message: this.commentForm.value.message,
        parentId: localStorage.getItem("id")
      });
      this.commentForm.reset();
      this.content.scrollToBottom(300);
    }, (err) => {
      this.nl.errMessage();
      this.notPost = true;
      this.commentForm.reset();
    });
  }

}