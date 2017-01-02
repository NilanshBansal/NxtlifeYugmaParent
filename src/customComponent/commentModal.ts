import { Component, Input, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ViewController, ToastController, NavParams, Content } from 'ionic-angular';

// import service
import { ComplaintSuggestion } from '../service/cs.service';
import { CustomService } from '../service/customService';

@Component({
  selector: 'comment',
  template: `
    <ion-content id="chat" class="chat" style="margin-top:56px">
      <ion-list *ngIf="emptyComments">
        <h3>No Comments</h3>
      </ion-list>
      <ion-spinner *ngIf="!hasData"></ion-spinner>
      <ion-card class="message-box" *ngFor="let m of comments" [ngClass]="{'mine': m.parentId != null}" no-margin>
        <ion-item no-padding>
          <ion-avatar class="user" item-left text-center *ngIf="!m.parentId" >
            <img src="assets/images/avatar-ts-woody.png">
            <span>Pankaj</span>
          </ion-avatar>
          <h3>{{ m.comment }}</h3>
          <ion-note><span>{{ m.createdAt | amCalendar }}</span></ion-note>
        </ion-item>
      </ion-card>
    </ion-content>

    <ion-footer keyboard-attach class="bar-stable" #commentBtn>
      <form class="comment-box" [formGroup]="commentForm" (ngSubmit)="postComment()" novalidate>
        <ion-item >
          <ion-textarea rows="1" type="text" formControlName="comment" placeholder=" Write comment..."></ion-textarea>
          <button clear color="primary" ion-button icon-only item-right type="submit" [disabled]="commentForm.invalid">
            <ion-icon name="md-send" role="img"></ion-icon>
          </button>
        </ion-item>
      </form>
    </ion-footer>
  `
})

export class CommentModal implements OnInit {

  @Input() complaint;

  commentForm: FormGroup;
  comment: any;
  comments: any[];
  emptyComments = false;
  complaintId: number;
  hasData = false;
  notPost = true;

  @ViewChild(Content) content: Content;
  @ViewChild('commentBtn') el : ElementRef;

  constructor(private viewCtrl: ViewController,
              private nl: CustomService,
              private c: ComplaintSuggestion,
              private navParams: NavParams,
              private renderer: Renderer,
              private elementRef: ElementRef,
              private toastCtrl: ToastController) {

  }

  ngOnInit() {
    let complaint = this.navParams.get('complaint');
    this.complaintId = complaint.id;
    this.loadComments();
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
    if (this.complaint.statusId === 4 || this.complaint.statusId === 6) {
      this.renderer.setElementStyle(this.el.nativeElement, "visibility", 'hidden');
      this.showToastMessage();
    }
  }

  showToastMessage() {
    let toast = this.toastCtrl.create({
      message: "You can't comment on it any more, may be your complaint status is closed or satisfied",
      showCloseButton: true,
      closeButtonText: "Ok",
      dismissOnPageChange: true
    });
    toast.onDidDismiss(() => {
      toast.dismiss();
    });
    toast.present();
  }

  scrollToBottom() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollBottom, 0);
  }

  loadComments() {
    this.c.getComments(this.complaintId).subscribe((response) => {
      if (response.status === 204) {
        this.hasData = true;
        this.emptyComments = true;
        this.comments = [];
      } else {
        this.hasData = true;
        this.emptyComments = false;
        this.comments = response.json().reverse();
        this.scrollToBottom();
      }
    });
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
      this.c.postComment(this.complaint.id, this.commentForm.value).subscribe(res => {
        this.notPost = true;
        if (!this.comments) { this.comments = []; }
        this.comments.push({
          createdAt: new Date(),
          employeeName: null,
          parentName: localStorage.getItem("name"),
          comment: this.commentForm.value.comment,
          parentId: localStorage.getItem("id")
        });
        this.commentForm.reset();
      });
    }
  }

}
