import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController, ActionSheetController } from 'ionic-angular';

import { ParentInfo } from '../../../service/parentInfo';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { CustomService } from '../../../service/customService';
import { Configuration } from '../../../service/app.constants';

import * as _ from 'underscore';

@Component({
  selector: 'new-appreciation-modal',
  templateUrl: 'appreciation.html'
})

export class NewAppreciationModal implements OnInit {

  public students;
  public student;
  public standardId;
  public studentId;
  public categories;
  public childCategories;
  public category;
  public teachers;
  public teacherId;
  public childCategory;
  public child;
  public description = [];

  newSuggestion: FormGroup;
  myForm: FormGroup;

  title = "NEW APPRECIATION";

  master = "appreciation";

  constructor(public viewCtrl: ViewController,
              public parentInfo: ParentInfo,
              public toastCtrl: ToastController,
              public formBuilder: FormBuilder,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public con: Configuration,
              public actionSheetCtrl: ActionSheetController) {
    this.con.setUrlForAppreciations();
  }

  selectChild(student) {
    if (student) {
      this.studentId = student.id;
      this.standardId = student.standardId;
      this.getTeachers();
    }
  }

  public getTeachers() {
    this.nl.showLoader();
    this.c.getTeachers(this.standardId).subscribe((teachers) => {
      this.nl.hideLoader();
      this.nl.hideLoader();
      this.teachers = teachers; // Get teachers list
    }, (err) => {
      this.nl.onError(err);
    });
  }

  ngOnInit() {
    this.loadForm();
    this.students = this.parentInfo.getStudents();
    if (this.students.length === 1) {
      this.nl.showLoader();
      this.child = this.students[0];  // Auto select for one child
    }
    this.nl.showToast("All fields are mandatory to send appreciation");
  }

  loadForm() {
    this.newSuggestion = this.formBuilder.group({
      studentId: ['', Validators.required],
      teacherId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentActionSheet(newSuggestion) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.nl.showLoader();
          this.c.saveComplaint(newSuggestion).subscribe((complaint) => {
            this.nl.hideLoader();
            this.viewCtrl.dismiss(complaint);
          });
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

  saveSuggestion(){

    if (this.newSuggestion.invalid) {
      console.log("Suggestion invalid")
    } else {
      let a = this.newSuggestion.value.studentId.id;
      this.newSuggestion.value.studentId = a;
      this.presentActionSheet(this.newSuggestion.value);
    }
  }

}
