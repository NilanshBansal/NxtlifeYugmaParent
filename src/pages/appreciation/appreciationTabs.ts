import { Component } from '@angular/core';
import { AppreciationForYou } from './appreciationForYou/appreciation';
import { YourAppreciation } from './yourAppreciation/appreciation';

@Component({
  template: `
    <ion-tabs color="primary">
      <ion-tab tabTitle="BY ME" [root]="tab1"></ion-tab>
      <ion-tab tabTitle="FOR ME" [root]="tab2"></ion-tab>
    </ion-tabs>
`})

export class AppreciationTabs {
  tab1 = YourAppreciation;
  tab2 = AppreciationForYou;
}
