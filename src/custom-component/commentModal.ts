import { Component, Input, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ViewController, ToastController, NavParams, Content } from 'ionic-angular';

// import service
import { ComplaintSuggestion } from '../service/cs.service';
import { CustomService } from '../service/custom.service';

@Component({
  selector: 'comment',
  template: `
<ion-header>
  <nl-modal-navbar [title]="title" [complaint]="complaint"></nl-modal-navbar>
</ion-header>
<ion-content id="chat" class="csChatBox">
  <ion-list class="no-comment" *ngIf="emptyComments">
    <ion-icon name="chatbubbles"></ion-icon>
    <br>NO COMMENT
  </ion-list>
  <div class="message-box csTransparent" *ngFor="let m of comments" [ngClass]="{'mine': m.parentId == userId}" no-margin>
    <div class="csMyComment">
      <h3>{{ m.comment }}</h3>
    </div>
    <div class="csCommentTime">{{m.employeeNickName}}{{m.parentName}} {{ m.createdAt | amCalendar }}</div>
  </div>
  <ion-spinner class="loader" name="dots" *ngIf="!notPost"></ion-spinner>
</ion-content>
<ion-footer keyboard-attach class="bar-stable" #commentBtn>
  <form class="comment-box" [formGroup]="commentForm" (ngSubmit)="postComment()" novalidate>
    <ion-grid>
      <ion-row>
        <ion-col width-80>
          <ion-textarea rows="2" class="csCommentInput" type="text" formControlName="comment" placeholder=" Write comment..."></ion-textarea>
        </ion-col>
        <ion-col>
          <button class="csCommentSend" color="primary" ion-button icon-only item-right type="submit" [disabled]="commentForm.invalid || !notPost">
            <ion-icon name="md-send" role="img"></ion-icon>
          </button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </form>
</ion-footer>
  `
})

export class CommentModal {

  @Input() complaint;

  commentForm: FormGroup;
  comment: any;
  comments: any[];
  emptyComments = false;
  complaintId: number;
  notPost = true;
  data;

  title = "COMMENTS";

  userId;

  @ViewChild(Content) content: Content;
  @ViewChild('commentBtn') el : ElementRef;

  constructor(private viewCtrl: ViewController,
              private nl: CustomService,
              private c: ComplaintSuggestion,
              private navParams: NavParams,
              private renderer: Renderer,
              private elementRef: ElementRef,
              private toastCtrl: ToastController) {
    this.initForm();
    this.getData();
  }

  initForm() {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }

  getData() {
    this.userId = localStorage.getItem("id");
    let data = this.navParams.get("comments");
    if (data.status === 204) {
      this.emptyComments = true;
    } else {
      this.comments = data;
    }
    this.data = this.navParams.get("data");
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
    if (this.data.statusId === 4 || this.data.statusId === 6) {
      this.renderer.setElementStyle(this.el.nativeElement, "visibility", 'hidden');
      this.showToastMessage();
    }
  }

  showToastMessage() {
    let toast = this.toastCtrl.create({
      message: "You can't comment on it any more, may be your complaint status is closed or satisfied",
      showCloseButton: true,
      closeButtonText: "Ok",
      duration: 5000,
      dismissOnPageChange: true
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  postComment() {
    this.content.scrollToBottom();
    if (!this.commentForm.valid) {
      console.log("not valid form");
    } else {
      this.notPost = false;
      this.emptyComments = false;
      this.c.postComment(this.data.id, this.commentForm.value).subscribe((res) => {
        this.notPost = true;
        if (!this.comments) { this.comments = []; }
        this.comments.push({
          createdAt: new Date(),
          employeeName: null,
          comment: this.commentForm.value.comment,
          parentId: localStorage.getItem("id")
        });
        this.commentForm.reset();
        this.content.scrollToBottom();
      }, (err) => {
        this.nl.errMessage();
        this.notPost = true;
        this.commentForm.reset();
      });
    }
  }

}
