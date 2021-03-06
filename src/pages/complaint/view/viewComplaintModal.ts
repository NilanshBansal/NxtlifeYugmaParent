import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

// import base class
import { EditComplaintStatusAndComment } from '../../../custom-component/list/edit-cs-status-and-comment.class';

// import service
import { CustomService } from '../../../service/custom.service';
import { ComplaintSuggestion } from '../../../service/cs.service';
import { AuthService } from '../../../service/auth.service';
import { PouchDbService } from "../../../service/pouchdbservice";

@Component({
  selector: 'nl-view',
  templateUrl: 'view.component.html'
})

export class ViewComponent extends EditComplaintStatusAndComment implements OnInit {

  complaint;
  public msgsTotal; //nilansh
  title: string;
  baseUrl: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private navParams: NavParams,
              public appService: AuthService,
              private viewCtrl: ViewController,
              public pouchdbservice:PouchDbService) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl,pouchdbservice);
  }

  ngOnInit() {
    this.baseUrl = localStorage.getItem("fileUrl") + "/";
    this.title = "VIEW " + this.nl.getHeaderText();
    this.complaint = this.navParams.get('viewData');
    this.sockJsConnection();
  }

  public sockJsConnection() {
    let stompClient = this.appService.getSockJs();
    let tmp = this.nl.getHeaderText();
    let url = '/parent/'+ tmp + '/' + this.complaint.id + '/close';
    let that = this;
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(url, function (greeting) {
        let message = JSON.parse(greeting.body);
        if (!message) {
          return;
        }
        that.complaint = message;
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

   ionViewWillEnter(){
    //nilansh
    this.msgsTotal=this.complaint.commentCount+this.nl.chatIncrement;
    this.complaint.commentCount=this.msgsTotal;

  }

  ionViewWillLeave(){
    this.nl.chatIncrement=0;
  }
  

}
