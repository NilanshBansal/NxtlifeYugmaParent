import { Component,OnInit } from '@angular/core';
import { CircularService } from './../../service/circular.servce';


@Component({
    selector : 'circular-parent',
    templateUrl : 'circular.html'
})



export class CircularComponent implements OnInit{

    constructor(private circserv : CircularService ){}

    ngOnInit(): void {

    }
}