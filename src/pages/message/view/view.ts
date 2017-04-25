import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewController, NavParams, Content, ToastController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { MessageService } from '../../../service/message.service';
import { ParentInfo } from '../../../service/parentInfo';
import { CommonService } from '../../../service/common.service'; 
import { AuthService } from '../../../service/auth.service';
import { Camera } from '@ionic-native/camera';
import { Transfer , TransferObject } from  '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import * as _ from 'underscore';

@Component({
  selector: 'view-message',
  templateUrl: 'view.html',
  styles: [`
`]
})

export class ViewMessagePage {

  public headerTitle: string = "Messages";
  public messages = [];
  commentForm: FormGroup;
  notPost = true;
  id;
  public base64Image : string;
  public ImageFile;
  currentPage = 1;
  userImage;

  @ViewChild(Content) content: Content;

  constructor(public file: File,
              public camera: Camera,
              public transfer: Transfer,
              public appService: AuthService,
              public actionSheetCtrl: ActionSheetController,
              private navParams: NavParams,
              private nl: CustomService,
              public toastCtrl: ToastController,
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
    this.userImage = localStorage.getItem('fileUrl') + "/";
  }

  public getData() { 
    this.messages = this.navParams.get('message').reverse();
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
          that.showToastMessage();
       });
    });
  }

  public showToastMessage() {
    let toast = this.toastCtrl.create({
      message: 'New Message Received.',
      position: 'bottom',
      duration: 5000,
      closeButtonText: 'VIEW',
      showCloseButton: true
    });
    toast.onDidDismiss(() => {
      this.content.scrollToBottom(300);
    });
    toast.present();
  }

  public postMessage() {
    this.notPost = false;
    this.messageService.postMessage(this.id, this.commentForm.value).subscribe((res) => {
      this.notPost = true;
      this.messages.push({
        createdAt: new Date(),
        employeeId: null,
        message: this.commentForm.value.message,
        parentName: localStorage.getItem("name")
      });
      this.commentForm.reset();
      this.content.scrollToBottom(300);
    }, (err) => {
      this.nl.errMessage();
      this.notPost = true;
      this.commentForm.reset();
    });
  }

  public openImageActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Album',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'Photo & Video Library',
        icon:  'image',
        handler: () => {
          this.openGallery();
        }
      }, {
        text: 'Document',
        icon: 'document',
        handler: () => {
          this.openDocument();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

  public openGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((imagedata)=> {
      this.base64Image = 'data:image/jpeg;base64,' + imagedata;
      this.appService.uploadPic(this.base64Image, null).then((res) => {
      })
    },(err) => {
    });
  }

  public openCamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth : 1000,
      targetHeight : 1000,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }).then((imagedata) => {
      this.base64Image = 'data:image/jpeg;base64,' + imagedata;
      this.ImageFile = imagedata;
      this.notPost = false;
      this.messages.push({
        image: this.base64Image,
        createdAt: new Date(),
        employeeName: localStorage.getItem("id"),
        parentName: null
      });
      this.appService.uploadPic(this.base64Image, null).then((res) => {
        this.notPost = true;
      });
    },(err) => {
    });
  }

  openDocument() {
    
  }

  public onPullOldMessages(refresher) {
    this.currentPage += 1;
    this.messageService.getMessage(this.id, this.currentPage).subscribe((res) => {
      refresher.complete();
      if (res.status === 204) {
        return;
      }
      this.messages = res.reverse().concat(this.messages);
    }, (err) => {
      refresher.complete();
      this.currentPage -= 1;
      this.nl.showToast("Something went wrong");
    });
  }

}