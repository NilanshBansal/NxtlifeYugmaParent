import { Component,OnInit } from '@angular/core';
import { CircularService } from '../../../service/circular.servce';
import { NavParams,Events} from 'ionic-angular';


@Component({

    selector : 'circular-view',
    templateUrl : 'circular-view.html',
    styles: [`

    `]
})


export class CircularViewComponent implements OnInit{

    id;
    onecirc = {};

    constructor(private circserv : CircularService ,
                private navparams : NavParams ){


             this.id = navparams.get('id');       

    }


    OneCircular(){
        this.circserv.getParticularCirculars(this.id)
        .subscribe( response => { this.onecirc = response; },
                    () => console.log('onecirc',this.onecirc) )
    }


    ngOnInit(){
        this.OneCircular();
    }

}