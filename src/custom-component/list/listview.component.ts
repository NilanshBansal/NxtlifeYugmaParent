import { Component, Input } from '@angular/core';

@Component({
  selector: 'nl-list-view',
  template:  `
    <h2 *ngIf="!complaint.againstEmployeeName"><b>{{complaint.againstCategoryName}}</b></h2>
    <h2 *ngIf="complaint.againstEmployeeName"><b>{{complaint.againstEmployeeName}}</b></h2>
    <h3>{{complaint.title}}</h3>
    <ion-note >
      <ion-row>
        <ion-col width-50 class="no-padding-l" style="color:#535353;"><ion-icon name="clock"></ion-icon><span>{{complaint.createdAt | amTimeAgo}}</span>
        </ion-col>
        <ion-col width-50 class="no-padding-l" [style.color] = "complaint.statusColor"><ion-icon name="at"></ion-icon><span>{{complaint.statusName}}</span>
        </ion-col>
      </ion-row>
    </ion-note>
  `
})

export class ListView {

  @Input() complaint;

}
