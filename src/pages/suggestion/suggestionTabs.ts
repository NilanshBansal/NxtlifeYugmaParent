import { Component } from '@angular/core';
import { SuggestionForYou } from './suggestionForYou/suggestion';
import { YourSuggestion } from './yourSuggestion/suggestion';

@Component({
  template: `
    <ion-tabs color="primary">
      <ion-tab tabTitle="BY ME" [root]="tab1"></ion-tab>
      <ion-tab tabTitle="FOR ME" [root]="tab2"></ion-tab>
    </ion-tabs>
`})

export class SuggestionTabs {
  tab1 = YourSuggestion;
  tab2 = SuggestionForYou;
}
