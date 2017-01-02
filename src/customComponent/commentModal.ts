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
      <div class="messages">
        <div class="message" *ngFor="let m of comments" [ngClass]="{'me': m.parentId != null}">
          {{ m.comment }}
          <span class="date">{{ m.createdAt | amCalendar }}</span>
        </div>
        <ion-spinner style="position: absolute;bottom: -28px;right: 10px;" name="dots" *ngIf="!notPost"></ion-spinner>
      </div>
    </ion-content>

    <ion-footer keyboard-attach class="bar-stable" #commentBtn>
      <form [formGroup]="commentForm" (ngSubmit)="postComment()" novalidate>
        <label class="item-input-wrapper">
          <ion-input type="text" formControlName="comment" placeholder="write comment..."></ion-input>
        </label>
        <div class="footer-button-wrap">
          <button button-clear ion-button type="submit" [disabled]="commentForm.invalid">Send</button>
        </div>
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
