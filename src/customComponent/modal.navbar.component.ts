import { Component, Input } from '@angular/core';
import { Events, ViewController } from 'ionic-angular';

@Component({
  selector: 'nl-modal-navbar',
  template: `
  <ion-toolbar color="primary">
      <ion-buttons start>
        <button ion-button color="light" class="navBtnRight" (click)="dismiss()">
          <span color="light" showWhen="ios">Cancel</span>
          <ion-icon color="light" name="md-close" showWhen="android,windows" class="csBigIcon"></ion-icon>
        </button>
      </ion-buttons>
      <ion-title>
        {{title | uppercase}}
      </ion-title>
 </ion-toolbar>   
  `,
  styles: [`

  `]
})

export class ModalNavbarComponent {

  @Input() title: string;
  @Input() complaint = {};

  constructor(public events: Events, private viewCtrl: ViewController) {

  }

  public dismiss(): void {
    this.viewCtrl.dismiss(this.complaint);
  }

}
