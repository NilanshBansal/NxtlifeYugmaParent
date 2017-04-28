import { Component } from '@angular/core';
import { NavController, Events, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Transfer , TransferObject } from  '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { AuthService } from '../../service/auth.service';
import { CustomService } from '../../service/custom.service';
import { CommonService } from '../../service/common.service';
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
  public showLoader: boolean = false;
  public imagePath: string = localStorage.getItem('fileUrl') + "/";
  public basePath = localStorage.getItem('fileUrl') + "/";
  public userImage: string = localStorage.getItem("picTimestamp");

  constructor(public file: File,
              public camera: Camera,
              public transfer: Transfer,
              public navCtrl: NavController,
              public events: Events,
              public nl: CustomService,
              public appService: AuthService,
              public commonService: CommonService,
              public actionSheetCtrl: ActionSheetController) {
  }

  ionViewWillEnter() {
    this.name = localStorage.getItem("name");
    this.emailId = localStorage.getItem("emailId");
    this.contactNo = localStorage.getItem("contactNo");
    this.id = localStorage.getItem("id");
    this.nickname = localStorage.getItem("nickname");
    this.students = JSON.parse(localStorage.getItem("students"));
    this.students.forEach((val, index) => {
      val["baseUrl"] = this.basePath
    });
    console.log(this.students)
  }

  logout() {
    this.events.publish('user:logout');
  }

  public openImageActionSheet(data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Album',
      buttons: [{
        text: 'Delete Photo',
        role: 'destructive',
        handler: () => {
        }
      }, {
        text: 'Take Photo',
        handler: () => {
          if (data) {
            this.openCameraForStudent(data);
          } else {
            this.openCamera();
          }
        }
      }, {
        text: 'Choose Photo',
        handler: () => {
          if (data) {
            this.openGalleryForStudent(data);
          } else {
            this.openGallery();
          }
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
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      quality: 30
    }).then((imagedata)=> {
      this.basePath = 'data:image/jpeg;base64,';
      this.userImage = imagedata;
      this.saveImage(this.basePath+this.userImage);
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
      this.basePath = 'data:image/jpeg;base64,';
      this.userImage = imagedata;
      this.saveImage(this.basePath+this.userImage);
    },(err) => {
    });
  }

  public saveImage(image) {
    this.showLoader = true;
    this.appService.uploadPic(image, null).then((res) => {
      this.showLoader = false;
      this.events.publish("user:image", image);
      localStorage.setItem("picTimestamp", res.fileTimestamp);
      localStorage.setItem("picOriginalName", res.fileOriginalName);
    }, (err) => {
      this.showLoader = false;
      this.nl.errMessage();
    });
  }

  public openCameraForStudent(student) {
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
      student.baseUrl = 'data:image/jpeg;base64,';
      student.picTimestamp = imagedata;
      this.appService.uploadPic(image, student.id).then((res) => {
      }, (err) => {
        this.showLoader = false;
        this.nl.errMessage();
      });
    },(err) => {
    });
  }

  public openGalleryForStudent(student) {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      quality: 30
    }).then((imagedata)=> {
      let image = 'data:image/jpeg;base64,' + imagedata;
      student.baseUrl = 'data:image/jpeg;base64,';
      student.picTimestamp = imagedata;
      this.appService.uploadPic(image, student.id).then((res) => {
        this.students.forEach((val, index) => {
          if (val.id === student.id) {
            val["picTimestamp"] = res.fileTimestamp;
            val["picOriginalName"] = res.fileOriginalName;
          }
        });
        this.commonService.storeData("students", this.students);
      }, (err) => {
        this.showLoader = false;
        this.nl.errMessage();
      });
    },(err) => {
    });
  }

}