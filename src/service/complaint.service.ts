import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ToastController } from 'ionic-angular';

import { Configuration } from './app.constants';

import { SafeHttp } from './safe-http';

import { ComplaintPage } from '../pages/complaint/complaint';

import * as PouchDB from 'pouchdb';
import * as _ from 'underscore';

@Injectable()
export class ComplaintService {

  private actionUrl: string;
  private headers: any;
  private _db;

  constructor(private http : Http,
              private safeHttp: SafeHttp,
              private toastCtrl: ToastController,
              private configuration: Configuration) {

    this.actionUrl = configuration.ComplaintUrl();
    this.headers = configuration.header();
    this._db = new PouchDB('yugma_complaint');
  }

  public getTeachers(standardId) {
    console.log("QQ", this.headers)
    return this.safeHttp.get(this.actionUrl + "/teacher/" + standardId)
      .then(res => { return Promise.resolve(res) })
      .catch(err => {
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
  }

  public getCategories() {
    return this.safeHttp.get(this.actionUrl + "/category" + "?access_token=" + localStorage.getItem ("access_token"))
      .then(res => {
         return Promise.resolve(res);
      })
      .catch(err => {
        console.log("err in get categories", err)
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
  }

  public saveComplaint(complaintData): any {

    _.extend(complaintData, {
        _id: new Date().toISOString()
    });

    this._db.put(complaintData).then(res => {

      let toast = this.toastCtrl.create({
        message: 'Complaint submitted successfully..',
        duration: 5000,
        position: 'bottom'
      });
      toast.present();

      this.safeHttp.post(this.actionUrl, _.omit(complaintData, '_id'))
        .then(response => {
          console.log("res2", response);
          return Promise.resolve(response)
        }).catch(err => {
          let toast = this.toastCtrl.create({
            message: 'Due to server load complaint reverted... Try again',
            duration: 5000,
            position: 'bottom'
          });
          toast.present();
        });
    }).catch(err => {
      console.log("err", err)
    })
  }

  public getComplaints(): any {
    return this.safeHttp.get(this.actionUrl).then(complaints => {
      return Promise.resolve(complaints);
    }).catch(err => {
      console.log("err in get complaints", err)
      if (err.status == 0) {
        this.safeHttp.ErrorMessage();
      } else {
        return Promise.reject(err);
      }
    });
  }

}
