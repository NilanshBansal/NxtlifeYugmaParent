import { Component } from '@angular/core';
import { CurrentHomework } from './current/homework';
import { PassedHomework } from './passed/homework';

@Component({
  template: `
    <ion-tabs color="primary">
      <ion-tab tabTitle="Current" [root]="tab1"></ion-tab>
      <ion-tab tabTitle="Past" [root]="tab2"></ion-tab>
    </ion-tabs>
`})

export class HomeworkTabs {
  tab1 = CurrentHomework;
  tab2 = PassedHomework;
}
