import { Component } from '@angular/core';
import { NavController, Events, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Transfer , TransferObject } from  '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { AuthService } from '../../service/auth.service';
import { CustomService } from '../../service/custom.service';
import * as _ from 'underscore';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styles: [`
    ion-slides{
    position:relative !important;
  }
  `]
})

export class AccountPage {

  name: string;
  emailId: string;
  contactNo;
  id;
  nickname: string;
  students;
  title = "Account";
  public base64Image : string;
  public ImageFile;
  public showLoader: boolean = false;

  constructor(public file: File,
              public camera: Camera,
              public transfer: Transfer,
              public navCtrl: NavController,
              public events: Events,
              public nl: CustomService,
              public appService: AuthService,
              public actionSheetCtrl: ActionSheetController) {
  }

  ionViewWillEnter() {
    this.name = localStorage.getItem("name");
    this.emailId = localStorage.getItem("emailId");
    this.contactNo = localStorage.getItem("contactNo");
    this.id = localStorage.getItem("id");
    this.nickname = localStorage.getItem("nickname");
    this.students = JSON.parse(localStorage.getItem("students"));
    let picTimestamp = localStorage.getItem("picTimestamp");
    let fileUrl = localStorage.getItem("fileUrl");
    if (picTimestamp === null) {
      this.base64Image = "http://open4profit.com/images/f2.jpg";
    } else {
      this.base64Image = fileUrl + "/" + picTimestamp;
    }
  }

  logout() {
    this.events.publish('user:logout');
  }

  public openGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((imagedata)=> {
      this.base64Image = 'data:image/jpeg;base64,' + imagedata;
      this.ImageFile = imagedata;
      this.showLoader = true;
      this.appService.uploadPic(this.base64Image).then((res) => {
        this.showLoader = false;
        this.events.publish("user:image", this.base64Image);
      }, (err) => {
        this.showLoader = false;
        this.nl.errMessage();
      });
    },(err) => {
    });
  }

  public openCamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth : 1000,
      targetHeight : 1000,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imagedata) => {
      this.base64Image = 'data:image/jpeg;base64,' + imagedata;
      this.ImageFile = imagedata;
      this.showLoader = true;
      this.appService.uploadPic(this.base64Image).then((res) => {
        this.showLoader = false;
        this.events.publish("user:image", this.base64Image);
      }, (err) => {
        this.showLoader = false;
        this.nl.errMessage();
      });
    },(err) => {
    });
  }

  public openImageActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Album',
      buttons: [{
        text: 'Delete Photo',
        role: 'destructive',
        handler: () => {
          this.base64Image = "assets/images/user.png";
        }
      }, {
        text: 'Take Photo',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'Choose Photo',
        handler: () => {
          this.openGallery();
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

}