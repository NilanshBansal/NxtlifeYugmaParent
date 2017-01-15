import { Component, Input } from '@angular/core';

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
      </ion-card>
    </ion-list>
  `
})

export class ViewComponent {

  @Input() complaint: string;

  constructor() {

  }

}
