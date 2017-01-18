import { Component,OnInit } from '@angular/core';
import { CircularService } from './../../service/circular.servce';


@Component({
    selector : 'circular-parent',
    templateUrl : 'circular.html'
})



export class CircularComponent implements OnInit{

    public circulars = [];
    title : string = "Circular";
     
    constructor(private circserv : CircularService ){}


    AllCirculars(){
        this.circserv.getAllCirculars()
        .subscribe( response => { this.circulars = response },
                    err => console.error(err),
                    () => console.log('circular response', this.circulars)
        )
    }

    ngOnInit(): void {

    }
}