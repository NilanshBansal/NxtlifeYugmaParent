import { Component, Input } from '@angular/core';
import { EditComplaintStatusAndComment } from '../list/listview.btn.class';

import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

@Component({
  selector: 'nl-view',
  templateUrl: 'view.component.html'
})

export class ViewComponent extends EditComplaintStatusAndComment {

  @Input() complaint: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}
