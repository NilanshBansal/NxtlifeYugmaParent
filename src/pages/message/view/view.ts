import { Component, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NavParams, Content, ToastController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { MessageService } from '../../../service/message.service';
import { CommonService } from '../../../service/common.service'; 
import { AuthService } from '../../../service/auth.service';
import { Camera } from '@ionic-native/camera';
import { Transfer } from  '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { PouchDbService } from "../../../service/pouchdbservice";

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
  isClosed: boolean = false;
  conversation;
  baseUrl;
  show = false;

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
              private messageService: MessageService,
              public pouchdbservice:PouchDbService) {
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
    this.messages = this.navParams.get('messages').reverse();
    this.conversation = this.navParams.get("conversation");
    this.baseUrl = localStorage.getItem("fileUrl") + "/";
    this.id = this.conversation.id;
    this.isClosed = this.conversation.isClosed;
    if (this.isClosed) {
      this.showToastMessage();
    }
  }

  showToastMessage() {
    let toast = this.toastCtrl.create({
      message: "Message status is closed, you can't send new message",
      showCloseButton: true,
      closeButtonText: "Ok",
      duration: 5000
    });
    toast.present();
  }

  public sockJsConnection() {
    let stompClient = this.appService.getSockJs();
    let url = '/parent/conversation/'+ this.id +'/message';
    let that = this;
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(url, function (greeting) {
        let message = JSON.parse(greeting.body);
        if (!message) {
          return;
        }
        if (!that.messages) {
          that.messages = [];
        }
        that.messages.push(message);
      });
    });
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
      var obj;
      var len;
      let that=this;
      this.pouchdbservice.findDoc(this.id,"msgchats_").then(function(result){
        console.log("see found doc: ",result);
        len=result["length"];
          obj=result;
          
          return that.pouchdbservice.deleteDoc(result);
      
      }).then(function(argument){
          obj[len]={};
          obj[len]["createdAt"]=that.messages[that.messages.length-1].createdAt.toString();
          obj[len]["message"]=that.messages[that.messages.length-1].message;
          obj[len]["employeeName"]="";
          obj[len]["parentName"]=that.messages[that.messages.length-1].parentName;
          obj[len]["employeeId"]=that.messages[that.messages.length-1].employeeId;
          obj[len]["employeeNickName"]="";
          obj[len]["parentPicTimestamp"]="";
          obj[len]["parentPicOriginalName"]="";
          
          obj["length"]=len+1;
          delete obj["_rev"];
          that.pouchdbservice.addSingle(obj,"msgchats_",that.id);
        },(error)=>{console.log("error is: ",error)});

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
      this.notPost = false;
      this.messages.push({
        image: this.base64Image,
        createdAt: new Date(),
        employeeId: null,
        parentName: localStorage.getItem("id")
      });
      this.messageService.uploadPic(this.base64Image, this.id).then((res) => {
        this.notPost = true;
        this.content.scrollToBottom(300);
      }, (err) => {
        // this.notPost = true;
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
    }).then((imagedata) => {
      this.base64Image = 'data:image/jpeg;base64,' + imagedata;
      this.ImageFile = imagedata;
      this.notPost = false;
      this.messages.push({
        image: this.base64Image,
        createdAt: new Date(),
        employeeId: null,
        parentName: localStorage.getItem("id")
      });
      this.messageService.uploadPic(this.base64Image, this.id).then((res) => {
        this.notPost = true;
        this.content.scrollToBottom(300);
        alert("suc " + JSON.parse(res));
      }, (err) => {
        alert("err " + JSON.stringify(err));
        // this.notPost = true;
      });
    },(err) => {
    });
  }

  openDocument() {
    
  }

//TODO nilansh 

  public onPullOldMessages(refresher) {
    let that=this;
    this.currentPage += 1;
    this.messageService.getMessage(this.id, this.currentPage).subscribe((res) => {
      refresher.complete();
      if (res.status === 204) {
        this.currentPage -= 1;
        return;
      }
      res.reverse();  
      this.messages = res.concat(this.messages);
      this.pouchdbservice.addArrayOfObjectsToDoc(this.messages,this.id,"msgchats_");
    }, (err) => {
      refresher.complete();
      this.currentPage -= 1;
      this.nl.showToast("Something went wrong");
    });
  }

}