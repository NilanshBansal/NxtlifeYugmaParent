import { Component, Input } from '@angular/core';
import { ListViewCloseButton } from '../list/listview.closebtn.component';

import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';

// import service
import { CustomService } from '../../service/customService';
import { ComplaintSuggestion } from '../../service/cs.service';

@Component({
  selector: 'nl-view',
  template: `
    <ion-card>
      <ion-item>
        <ion-note item-right><span [style.color]="complaint.statusColor"><ion-icon name="at" ></ion-icon> {{complaint.statusName}}</span></ion-note>
      </ion-item>
      <ion-item>
        <div class="complaint-item">
          <hr [style.border-top]="'1px' + ' groove ' + complaint.statusColor">
          <span [style.color]="complaint.statusColor">Title</span>
        </div>
        <h2 class="csParagraph">
          {{complaint.title}}
        </h2>
      </ion-item>
      <ion-item>
        <div class="complaint-item">
          <hr [style.border-top]="'1px' + ' groove ' + complaint.statusColor">
          <span [style.color]="complaint.statusColor">Against</span>
          <span [style.color]="complaint.statusColor">Description</span>
        </div>
        <h2 class="csParagraph">
          {{complaint.description}}
        </h2>
      </ion-item>
      <ion-item *ngIf="complaint.rca">
        <div class="complaint-item">
          <hr [style.border-top]="'1px' + ' groove ' + complaint.statusColor">
          <span [style.color]="complaint.statusColor">Root Cause Analysis</span>
        </div>
        <h2 class="csParagraph">
          {{complaint.rca}}
        </h2>
      </ion-item>
      <ion-item *ngIf="complaint.closedOn">
        <ion-note item-left>
          <span [style.color]="complaint.statusColor">
              <b>Created at</b>
            </span>
          <br>
          <span style="color:black">
              {{complaint.createdAt  | amDateFormat: 'LL'}}
            </span>
        </ion-note>
        <ion-note item-right *ngIf="complaint.closedOn">
          <span [style.color]="complaint.statusColor">
            <b>Closed on</b>
            </span>
          <br>
          <span style="color:black">
            {{complaint.closedOn  | amDateFormat: 'LL'}}
            </span>
        </ion-note>
      </ion-item>
    </ion-card>
    <ion-list>
      <ion-card>
        <ion-item *ngIf="complaint.closedOn==null" class="csTransparent csBottom-card">
          <ion-icon name="body" [style.color]="complaint.statusColor"></ion-icon>
          <span [style.color]="complaint.statusColor" class="csBoldFont">Created at</span>
          <span item-right icon-left>
            <h5>{{complaint.createdAt  | amDateFormat: 'LL'}}</h5>
          </span>
        </ion-item>
        <ion-item *ngIf="complaint.anonymous" class="csTransparent csBottom-card">
          <ion-icon name="body" [style.color]="complaint.statusColor"></ion-icon>
          <span [style.color]="complaint.statusColor" class="csBoldFont">Complaint by</span>
          <span item-right icon-left>
            <h5>Anonymous</h5>
          </span>
        </ion-item>
        <ion-item *ngIf="!complaint.anonymous" class="csTransparent">
          <ion-icon name="body" [style.color]="complaint.statusColor"></ion-icon>
          <span [style.color]="complaint.statusColor" class="csBoldFont">Student Name</span>
          <span item-right icon-left>
            <h5>{{complaint.studentName}}</h5>
          </span>
        </ion-item>
        <ion-item *ngIf="!complaint.anonymous" class="csTransparent">
          <ion-icon name="school" [style.color]="complaint.statusColor"></ion-icon>
          <span [style.color]="complaint.statusColor" class="csBoldFont">Standard</span>
          <span item-right icon-left>
            <h5>{{complaint.studentStandardName}}</h5>
          </span>
        </ion-item>
      </ion-card>
      <ion-card>
        <ion-item *ngIf="complaint.assignedEmployeeName" class="csTransparent" class="csTransparent">
          <ion-icon name="person-add" [style.color]="complaint.statusColor"></ion-icon>
          <span [style.color]="complaint.statusColor" class="csBoldFont">Assigned</span>
          <span item-right icon-left>
            <h5>{{complaint.assignedEmployeeName}}</h5>
          </span>
        </ion-item>
        <ion-item *ngIf="complaint.againstEmployeeName" class="csTransparent" class="csTransparent">
          <ion-icon name="contacts" [style.color]="complaint.statusColor"></ion-icon>
          <span [style.color]="complaint.statusColor" class="csBoldFont">Against</span>
          <span item-right icon-left>
            <h5>{{complaint.againstEmployeeName}}</h5>
          </span>
        </ion-item>
        <ion-item *ngIf="complaint.againstCategoryName && !complaint.againstEmployeeName" class="csTransparent">
          <ion-icon name="construct" [style.color]="complaint.statusColor"></ion-icon>
          <span [style.color]="complaint.statusColor" class="csBoldFont">Against</span>
          <span item-right icon-left>
            <h5>{{complaint.againstCategoryName}}</h5>
          </span>
        </ion-item>
        <ion-item *ngIf="complaint.priorityName" class="csTransparent">
          <ion-icon name="pulse" [style.color]="complaint.statusColor"></ion-icon>
          <span [style.color]="complaint.statusColor" class="csBoldFont">Priority</span>
          <span item-right icon-left>
            <h5>{{complaint.priorityName}}</h5>
          </span>
        </ion-item>
        <ion-row>
          <ion-col>
            <button (click)="openReopenModal(complaint)" *ngIf="complaint.statusId === 4" ion-button icon-left clear small>
              <ion-icon name="ios-thumbs-down"></ion-icon>
              <div>Reopen</div>
            </button>
          </ion-col>
          <ion-col>
            <button (click)="openSatisfiedModal(complaint)" *ngIf="complaint.statusId === 4" ion-button icon-left clear small>
              <ion-icon name="ios-thumbs-up"></ion-icon>
              <div>Satisfied</div>
            </button>
          </ion-col>
          <ion-col>
            <button (click)="openCommentModal(complaint)" ion-button icon-left clear small>
              <ion-icon name="md-chatbubbles"></ion-icon>
              <div>Comments</div>
            </button>
          </ion-col>
          <ion-col>
            <button (click)="openCloseModal(complaint)" *ngIf="complaint.statusId != 6 && complaint.statusId != 4" ion-button icon-left clear small>
            <ion-icon name="md-close"></ion-icon>
            <div>Close</div>
          </button>
          </ion-col>
        </ion-row>
      </ion-card>
    </ion-list>
  `
})

export class ViewComponent extends ListViewCloseButton {

  @Input() complaint: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: ComplaintSuggestion,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}
