import { Component, OnInit } from '@angular/core';
import { ComplaintSuggestion } from '../../service/cs.service';
import { CustomService } from '../../service/custom.service';
import { ParentInfo } from '../../service/parentInfo';
import { PouchDbService } from "../../service/pouchdbservice";

@Component({
  selector: 'student-rating',
  templateUrl: 'rating.html',
  styles:[`
  ion-slides{
    position:relative !important;
  }
  .csStarIcon {
    font-size: 125px;
  }
  ion-badge{
    font-size:30px;
  }
  .csRatingText{
        font-weight: bold;
    font-size: 1.6rem;
  }
  rating{
        margin-left: -15%;
  }
`]
})

export class StudentRating implements OnInit  {

  // set header title
  title: string = "Student Rating";

  public studentInfo;
  public emptyMessage;
  public students;
  public child;

  constructor(private r: ComplaintSuggestion,
              public parentInfo: ParentInfo,
              private nl: CustomService,
              public pouchdbservice:PouchDbService) { }

  ngOnInit() {
    this.students = this.parentInfo.getStudents();
    let studentId = this.parentInfo.getStudents()[0].id;
    this.child = this.students[0];
    this.getRatingInfo(studentId);
  }

  selectChild(student) {
    this.getRatingInfo(student.id);
  }

  public getRatingInfo(stu_id) {
    let that=this;
    this.nl.showLoader();
    this.r.getRatingInfo(stu_id).subscribe((res) => {
      this.onSuccess(res);
      console.log("see res: ",res);
      this.pouchdbservice.addSingleWithDelete(res,"rate_",stu_id)
    }, (err) => {
      this.onError(err);
      this.pouchdbservice.findDoc(stu_id,"rate_").then(function(doc){
        console.log("see found doc: ",doc);
          that.onSuccess(doc);
      });
    });
  }

  onSuccess(info) {
    this.nl.hideLoader();
    this.studentInfo = info.profile;
    this.emptyMessage = false;
    if (info.isEmpty) {
      this.studentInfo = [];
      this.emptyMessage = true;
    }
  }

  onError(err) {
    this.nl.onError(err);
  }

}
