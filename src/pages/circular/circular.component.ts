import { Component,OnInit } from '@angular/core';
import { CircularService } from './../../service/circular.servce';
import { CircularViewComponent } from './view/circular-view';
import { NavController,NavParams } from 'ionic-angular';
import { CustomService } from './../../service/customService';

@Component({
    selector : 'circular-parent',
    templateUrl : 'circular.html',
    providers: [CircularService]
})



export class CircularComponent implements OnInit{

    public circulars = [];
    title : string = "Circular";
    public allData = []; 
    public EmptyPolls:boolean = false;

    
    constructor(private circserv : CircularService ,
                private navCtrl : NavController ,
                private navparams : NavParams ,
                private nl : CustomService){}


    AllCirculars(){
        this.circserv.getAllCirculars()
        .subscribe( response => { this.circulars = response;},
                    err => console.error(err),
                    () => console.log('circular response', this.circulars)
        )
    }

    ranFunc(id){
        this.navCtrl.push(CircularViewComponent,{
            id : id
        });
    }


    doRefresh(refresher) {
            setTimeout(() => {
                this.circserv.getAllCirculars().subscribe((res) => {
                    this.onSuccess(res);
                    refresher.complete();
                }, (err) => {
                    refresher.complete();
                    this.onError(err);
                });
                }, 500);
     }

    onSuccess(res) {
    this.nl.hideLoader();
            if (res.status === 204) {
            this.EmptyPolls = true;
            } else {
            this.EmptyPolls = false;
            this.allData = res;
            }
     }

    onError(err) {
       this.nl.onError(err);
    }


    ngOnInit(): void {
        this.AllCirculars();
    }
}