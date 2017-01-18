import { Component,OnInit } from '@angular/core';
import { CircularService } from './../../service/circular.servce';
import { CircularViewComponent } from './view/circular-view';
import { NavController,NavParams } from 'ionic-angular';

@Component({
    selector : 'circular-parent',
    templateUrl : 'circular.html',
    providers: [CircularService]
})



export class CircularComponent implements OnInit{

    public circulars = [];
    title : string = "Circular";
     
    constructor(private circserv : CircularService ,
                private navCtrl : NavController ,
                private navparams : NavParams ){}


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

    ngOnInit(): void {
        this.AllCirculars();
    }
}