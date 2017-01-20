import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';

import { ViewController, NavParams, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ComplaintSuggestion } from '../../../service/cs.service';

@Component({
  selector: 'comment-modal',
  templateUrl: 'comment.modal.html'
})

export class CommentComplaintModal {
  complaint;
  title = "COMPLAINT COMMENTS";

  constructor(private navParams: NavParams) {
    this.complaint = this.navParams.get('complaint');
  }


}
