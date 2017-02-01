import { Injectable } from '@angular/core';

import { ToastController,
         AlertController,
         LoadingController
       } from 'ionic-angular';

@Injectable()
export class CustomService {

  public loading;
  public txt;

  constructor(private l: LoadingController,
              private a: AlertController,
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

  setHeaderText(text) {
    this.txt = text;
  }

  getHeaderText() {
    return this.txt;
  }

}
