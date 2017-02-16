import { Component } from '@angular/core';
import { NavController, ActionSheetController, Events } from 'ionic-angular';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

export class AccountPage {

  name: string;
  emailId: string;
  contactNo;
  id;
  nickname: string;
  students;

  constructor(public navCtrl: NavController,
              public events: Events,
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
    // localStorage.clear();
    // this.navCtrl.setRoot(LoginPage);
    this.events.publish('user:logout');
  }

  logoutActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to logout ?',
      buttons: [
        {
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
        }
      ]
    });
    actionSheet.present();
  }


}
