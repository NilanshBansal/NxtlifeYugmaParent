import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

// import base class
import { EditComplaintStatusAndComment } from '../../../custom-component/list/edit-cs-status-and-comment.class';

// import service
import { CustomService } from '../../../service/customService';
import { ComplaintSuggestion } from '../../../service/cs.service';

@Component({
  selector: 'nl-view',
  templateUrl: 'view.component.html'
})

export class ViewComponent extends EditComplaintStatusAndComment implements OnInit {

  complaint;
  title: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

  ngOnInit() {
    this.title = "VIEW " + this.nl.getHeaderText();
    this.complaint = this.navParams.get('viewData');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
