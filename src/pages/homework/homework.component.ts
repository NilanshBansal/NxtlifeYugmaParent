import { Component , OnInit } from '@angular/core';
import { HomeworkService } from './../../service/homework.service';

@Component({
    selector : 'homework-parent',
    templateUrl : 'homework.html'
})


export class HomeworkComponent implements OnInit{

    public homeworks = [];
    public title : string = 'Homework';

    constructor(private homeserv : HomeworkService){}

    getAllHomework(){
        this.homeserv.getHomeworks()
        .subscribe( response => { this.homeworks =  response},
                                () => console.log('homeworks',this.homeworks)
                    )
    }


    ngOnInit():void{

    }

}