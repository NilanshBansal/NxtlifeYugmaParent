import { Component } from '@angular/core';
import { SuggestionForYou } from './suggestionForYou/suggestion';
import { YourSuggestion } from './yourSuggestion/suggestion';

@Component({
  template: `
    <ion-tabs color="primary">
      <ion-tab tabTitle="Your Suggestion" [root]="tab1"></ion-tab>
      <ion-tab tabTitle="Suggestion For You" [root]="tab2"></ion-tab>
    </ion-tabs>
`})

export class SuggestionTabs {
  tab1 = YourSuggestion;
  tab2 = SuggestionForYou;
}
