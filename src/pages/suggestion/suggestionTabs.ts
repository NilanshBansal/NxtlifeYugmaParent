import { Component } from '@angular/core';
import { SuggestionForYou } from './suggestionForYou/suggestion';
import { YourSuggestion } from './yourSuggestion/suggestion';

@Component({
  template: `
    <ion-tabs color="primary" tabsLayout='icon-left'>
      <ion-tab tabTitle="BY ME" tabIcon="person-add"  [root]="tab1">BY ME</ion-tab>
      <ion-tab tabTitle="FOR ME" tabIcon="person" [root]="tab2"></ion-tab>
    </ion-tabs>` 
})

export class SuggestionTabs {
  tab1 = YourSuggestion;
  tab2 = SuggestionForYou;
}
