import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { MessageService } from '../../../service/message.service';
import { ParentInfo } from '../../../service/parentInfo';

@Component({
  selector: 'new-message',
  templateUrl: 'new.html'
})

export class NewMessagePage implements OnInit {

  public headerTitle: string = "New Message";
  newMessage: FormGroup;
  public students;
  public teachers: boolean = false;
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
              public viewCtrl: ViewController,
              public parentInfo: ParentInfo,
              public actionSheetCtrl: ActionSheetController) {
    this.loadForm();
  }

  ngOnInit() { 
    this.students = this.parentInfo.getStudents();
    if (this.students.length === 1) {
      this.child = this.students[0];  // Auto select for one child
      this.selectChild(this.child);
    }
  }

  public loadForm() {
    this.newMessage = this.formBuilder.group({
      categoryId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      message: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  public selectChild(student) {
    if (student) {
      this.studentId = student.id;
      this.standardId = student.standardId;
      this.getCategories();
    }
  }

  public getCategories() {
    this.nl.showLoader();
    this.messageService.getCategories(this.standardId).subscribe((res) => {
      this.nl.hideLoader();
      console.log(res);
      this.categories = res;
    }, (err) => {
      this.onError(err);
    });
  }

  public onError(err) {
    this.nl.onError(err);
  }

  public setCategory(categoryId) {
    this.teachers = true;
  }

  public presentActionsheet() {let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'YES',
        icon: 'ios-paper-outline',
        handler: () => {
          this.saveMessage();
        }
      }, {
        text: 'CANCEL',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();console.log(this.newMessage.value)
  }

  saveMessage() {
    this.nl.showLoader();
    this.messageService.saveMessage(this.newMessage.value).subscribe((res) => {
      this.nl.hideLoader();
      this.viewCtrl.dismiss(res);
      this.nl.showToast("Message sent successfully");
    },(err) => {
      this.viewCtrl.dismiss();
      this.nl.onError(err);
    })
  }

}