import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewController, ToastController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../../service/custom.service';
import { MessageService } from '../../../service/message.service';
import { ParentInfo } from '../../../service/parentInfo';

@Component({
  selector: 'view-message',
  templateUrl: 'view.html'
})

export class ViewMessagePage {

  public headerTitle: string = "Messages";
}