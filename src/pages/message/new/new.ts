import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewController, ToastController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { MessageService } from '../../../service/message.service';
import { ParentInfo } from '../../../service/parentInfo';

@Component({
  selector: 'new-message',
  templateUrl: 'new.html'
})

export class NewMessagePage {

  public headerTitle: string = "New Message";
  newMessage: FormGroup;
  public students;
  public student;
  public standardId;
  public studentId;
  public categories;
  public child;
  public title = [];
  public desc = [];

  constructor(public formBuilder: FormBuilder,
              public messageService: MessageService,
              public nl: CustomService,
              public parentInfo: ParentInfo,
              public actionSheetCtrl: ActionSheetController) {
                this.loadForm();
  }

  ionViewWillEnter() {
    this.students = this.parentInfo.getStudents();
    if (this.students.length === 1) {
      this.child = this.students[0];  // Auto select for one child
    }
    
  }

  loadForm() {
    this.newMessage = this.formBuilder.group({
      student: ['', Validators.required],
      category: ['', Validators.required],
      childCategory: ['', Validators.required],
      againstEmployeeId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      anonymous: [false]
    });
  }

  selectChild(student) {
    if (student) {
      this.studentId = student.id;
      this.standardId = student.standardId;
      console.log("AAAA", this.standardId);
      this.nl.showLoader();
      this.messageService.getCategories(this.standardId).subscribe((res) => {
        this.nl.hideLoader();
        console.log(res);
        this.categories = res;
      }, (err) => {
        console.log("err", err);
        this.onError(err);
      })
    }
  }

  public onError(err) {
    this.nl.onError(err);
  }

  setCategory(category) {
    console.log("SASASA", category)
  }

}