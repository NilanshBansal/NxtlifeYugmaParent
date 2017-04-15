import { Component, OnInit } from '@angular/core';
import { ViewController, ActionSheetController } from 'ionic-angular';

import { ParentInfo } from '../../../service/parentInfo';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { CustomService } from '../../../service/custom.service';
import { Configuration } from '../../../service/app.constants';

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
              public formBuilder: FormBuilder,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public con: Configuration,
              public actionSheetCtrl: ActionSheetController) {
    this.con.setUrlForAppreciations();
  }

  ionViewWillEnter() {
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
      this.dismiss();
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

  saveSuggestion(){
    if (this.newSuggestion.invalid) {
      console.log("Suggestion invalid")
    } else {
      let a = this.newSuggestion.value.studentId.id;
      this.newSuggestion.value.studentId = a;
      this.onSubmit(this.newSuggestion.value);
    }
  }

  onSubmit(newSuggestion) {
    this.nl.showLoader();
    this.c.saveComplaint(newSuggestion).subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
    });
  }

  onSuccess(res) {
    this.nl.hideLoader();
    this.nl.showToast("Appreciation post successfully")
    this.viewCtrl.dismiss(res);
  }

  onError(err) {
    this.nl.onError(err);
    this.dismiss();
  }

}
