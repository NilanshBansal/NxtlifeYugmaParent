import { Injectable } from '@angular/core';

import { ToastController,
         AlertController,
         LoadingController,
         Events
       } from 'ionic-angular';

@Injectable()
export class CustomService {

  public loading;
  public txt;

  constructor(private l: LoadingController,
              private a: AlertController,
              public events: Events,
              private t: ToastController) { }

  public showLoader() {
    this.loading = this.l.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  public hideLoader() {
    this.loading.dismiss();
  }

  public showToast(msg) {
    let toast = this.t.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public errMessage() {
    let toast = this.t.create({
      message: 'Internal server error.. Try again later',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public onError(err) {
    this.hideLoader();
    let a = err.split("-")[0];
    if (a == 401) {
      this.events.publish("session:expired");
    }
    if (a == 0) {
      this.events.publish("offline");
    }
    this.showToast(err);
  }

  setHeaderText(text) {
    this.txt = text;
  }

  getHeaderText() {
    return this.txt;
  }

}
