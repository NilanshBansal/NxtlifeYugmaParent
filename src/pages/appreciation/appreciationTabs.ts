import { Component } from '@angular/core';
import { AppreciationForYou } from './appreciationForYou/appreciation';
import { YourAppreciation } from './yourAppreciation/appreciation';

@Component({
  template: `
    <ion-tabs color="primary" tabsLayout='icon-left'>
      <ion-tab tabTitle="BY ME" tabIcon="person-add" [root]="tab1"></ion-tab>
      <ion-tab tabTitle="FOR ME" tabIcon="person" [root]="tab2"></ion-tab>
    </ion-tabs>
`})

export class AppreciationTabs {
  tab1 = YourAppreciation;
  tab2 = AppreciationForYou;
}
