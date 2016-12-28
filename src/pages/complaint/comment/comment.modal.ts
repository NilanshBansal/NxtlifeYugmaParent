import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';

import { ViewController, NavParams, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ComplaintSuggestion } from '../../../service/cs.service';

@Component({
  selector: 'comment-modal',
  templateUrl: 'comment.modal.html'
})

export class CommentModal implements OnInit {

  ComplaintComment: FormGroup;
  comment: any;
  comments: any[];
  complaintId: number;
  emptyComments = false;

  @ViewChild('commentBtn') el : ElementRef;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private renderer: Renderer,
              private c: ComplaintSuggestion,
              private elementRef: ElementRef,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    let complaint = this.navParams.get('complaint');
    this.complaintId = complaint.id;
    this.ComplaintComment = this.formBuilder.group({
      comment: ['', Validators.compose([Validators.required])]
    });
    this.c.getComments(this.complaintId).subscribe((response) => {
      if (response.status === 204) {
        this.emptyComments = true;
      } else {
        this.emptyComments = false;
        this.comments = response.json();
      }
    });

    if (complaint.statusId === 4 || complaint.statusId === 6) {
      let toast = this.toastCtrl.create({
        message: "You can't comment on it any more, may be your complaint status is closed or satisfied",
        showCloseButton: true,
        closeButtonText: "Ok",
        dismissOnPageChange: true
      });

      toast.onDidDismiss(() => {
        this.renderer.setElementStyle(this.el.nativeElement, "visibility", 'hidden');
        toast.dismiss();
      });

      toast.present();
    }
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  postComment() {
    if (!this.ComplaintComment.valid) {
      console.log("not valid form");
    } else {
      this.comments.push({
        createdAt: new Date(),
        employeeName: null,
        comment: this.ComplaintComment.value.comment,
        employeeId: null,
        parentName: localStorage.getItem("name"),
        parentId: localStorage.getItem("id")
      });
      this.c.postComment(this.complaintId, this.ComplaintComment.value).subscribe((res) => {
        this.ComplaintComment.reset();
      });
    }
  }

}
