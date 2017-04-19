import { Component } from '@angular/core';
import { NavController, ActionSheetController, Events } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Transfer , TransferObject } from  '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { AuthService } from '../../service/auth.service';
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
  public base64Image : string = "http://open4profit.com/images/f2.jpg";
  public ImageFile;

  constructor(public file: File,
              public camera: Camera,
              public transfer: Transfer,
              public navCtrl: NavController,
              public events: Events,
              public appService: AuthService,
              private actionSheetCtrl: ActionSheetController,) {
  }

  ionViewWillEnter() {
    this.name = localStorage.getItem("name");
    this.emailId = localStorage.getItem("emailId");
    this.contactNo = localStorage.getItem("contactNo");
    this.id = localStorage.getItem("id");
    this.nickname = localStorage.getItem("nickname");
    this.students = JSON.parse(localStorage.getItem("students"));
  }

  logout() {
    this.events.publish('user:logout');
  }

  logoutActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to logout ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.logout();
        }
      },{
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

  public openGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((imagedata)=> {
      this.base64Image = 'data:image/jpeg;base64,' + imagedata;
      this.ImageFile = imagedata;
      this.appService.uploadPic(this.base64Image);
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
      this.appService.uploadPic(this.base64Image); 
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