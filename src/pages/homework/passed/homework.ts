import { Component } from '@angular/core';
import { HomeworkService } from '../../../service/homework.service';
import { CustomService } from '../../../service/custom.service';

@Component({
  selector: 'passed-homework',
  templateUrl: 'homework.html'
})

export class PassedHomework {

  public title : string = 'Homework';

  constructor() {
  }

}
