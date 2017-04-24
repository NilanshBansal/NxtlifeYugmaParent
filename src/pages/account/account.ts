import { Component } from '@angular/core';
import { NavController, Events, ActionSheetController, AlertController } from 'ionic-angular';
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
  studentImage = localStorage.getItem('fileUrl') + "/";
  public imagePath: string = localStorage.getItem('fileUrl') + "/";
  public userImage: string = localStorage.getItem("picTimestamp");

  constructor(public file: File,
              public camera: Camera,
              public transfer: Transfer,
              public navCtrl: NavController,
              public events: Events,
              public nl: CustomService,
              public alertCtrl: AlertController,
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
  }

  logout() {
    this.events.publish('user:logout');
  }

  public openGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      quality: 30
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
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      quality: 30
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

  public openimage(data) {
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
          this.openCameraForStudent(data.id);
        }
      }, {
        text: 'Choose Photo',
        handler: () => {
          // this.openGallery(data.id);
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

  public openCameraForStudent(studentId) {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth : 1000,
      targetHeight : 1000,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      quality: 30
    }).then((imagedata) => {
      let image = 'data:image/jpeg;base64,' + imagedata;
      this.appService.uploadStudentPic(image, studentId).then((res) => {
        this.showSuccess(res);
      }, (err) => {
        this.showLoader = false;
        this.nl.errMessage();
        this.showAlert(err);
      });
    },(err) => {
    });
  }

  showAlert(err) {
    let alert = this.alertCtrl.create({
      title: 'Image Upload Info',
      subTitle: err,
      buttons: ['OK']
    });
    alert.present();
  }

  showSuccess(res) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: res,
      buttons: ['OK']
    });
    alert.present();
  }

}