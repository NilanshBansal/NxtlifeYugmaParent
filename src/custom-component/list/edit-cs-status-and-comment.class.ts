import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { CommentModal } from '../commentModal';

// import service
import { CustomService } from '../../service/custom.service';
import { ComplaintSuggestion } from '../../service/cs.service';
import { PouchDbService } from "../../service/pouchdbservice";

export class EditComplaintStatusAndComment {

  complaint;
  stringvar;

  constructor(public modalCtrl: ModalController,
    public nl: CustomService,
    public c: ComplaintSuggestion,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public pouchdbservice: PouchDbService) { }

  onSuccess(res) {
    this.nl.hideLoader();
    this.updateData(res);
  }

  onError(err) {
    this.nl.onError(err);
  }

  //todo slider nilansh
  updateData(data) {
    console.log("dekh bhai data slider:", data);
    this.complaint.statusName = data.statusName;
    this.complaint.statusId = data.statusId;
    this.complaint.statusColor = data.statusColor;
    this.complaint.commentCount = data.commentCount;




  }

  complaintReopen(complaint, data) {
    if (this.nl.getHeaderText() == "complaint") {
      this.stringvar = "cmp_";
    }
    if (this.nl.getHeaderText() == "suggestion") {
      this.stringvar = "sgsyour_";
    }
    this.nl.showLoader();
    if (complaint.anonymous) {
      data["anonymous"] = true;
    } else {
      data["anonymous"] = false;
    }
    let that = this;
    this.c.reopenComplaint(complaint.id, data).subscribe((res) => {
      console.log("see res: ", res);
      if (res) {
        this.onSuccess(res);
        this.pouchdbservice.findDoc(res["id"], this.stringvar).then(function (doc) {
          console.log("found ", doc);
          return that.pouchdbservice.deleteDoc(doc);
        }).then(function (arg) {
          console.log("deleted", arg);
          that.pouchdbservice.addSingle(res, that.stringvar, res["id"]);
        }, (error) => { console.log("error is: ", error); });
      }
    }, (err) => {
      this.onError(err);
    });
  }

  complaintClose(complaint, reason) {
    if (this.nl.getHeaderText() == "complaint") {
      this.stringvar = "cmp_";
    }
    if (this.nl.getHeaderText() == "suggestion") {
      this.stringvar = "sgsyour_";
    }
    this.nl.showLoader();
    let that = this;
    if (complaint.anonymous) {
      reason["anonymous"] = true;
    } else {
      reason["anonymous"] = false;
    }
    this.c.closeComplaint(complaint.id, reason).subscribe((res) => {
      console.log("see res: ", res);
      if (res) {
        this.onSuccess(res);
        this.pouchdbservice.findDoc(res["id"], this.stringvar).then(function (doc) {
          console.log("found ", doc);
          return that.pouchdbservice.deleteDoc(doc);
        }).then(function (arg) {
          console.log("deleted", arg);
          that.pouchdbservice.addSingle(res, that.stringvar, res["id"]);
        }, (error) => { console.log("error is: ", error); });
      }
    }, (err) => {
      this.onError(err);
    });
  }

  complaintSatisfy(complaint) {
    if (this.nl.getHeaderText() == "complaint") {
      this.stringvar = "cmp_";
    }
    if (this.nl.getHeaderText() == "suggestion") {
      this.stringvar = "sgsyour_";
    }

    this.nl.showLoader();
    let that = this;
    this.c.satisfiedComplaint(complaint.id).subscribe((res) => {
      console.log("see res: ", res);
      if (res) {
        this.onSuccess(res);
        this.pouchdbservice.findDoc(res["id"], this.stringvar).then(function (doc) {
          console.log("found ", doc);
          return that.pouchdbservice.deleteDoc(doc);
        }).then(function (arg) {
          console.log("deleted", arg);
          that.pouchdbservice.addSingle(res, that.stringvar, res["id"]);
        }, (error) => { console.log("error is: ", error); });
      }
    }, (err) => {
      this.onError(err);
    });
  }

  openReopenModal(complaint): void {
    this.complaint = complaint;
    let prompt = this.alertCtrl.create({
      title: 'If you are not happy with the resolution then reopen',
      message: "",
      inputs: [{
        name: 'comment',
        placeholder: 'Write short description'
      }],
      buttons: [{
        text: 'Cancel',
        handler: (data) => { }
      }, {
        text: 'Reopen It!!',
        handler: (data) => {
          if (data.comment === "") {
            this.nl.showToast("write any comment to close");
            return;
          }
          this.reopenActionSheet(complaint, data);
        }
      }]
    });
    prompt.present();
  }

  reopenActionSheet(complaint, data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.complaintReopen(complaint, data);
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

  openCloseModal(complaint) {
    let prompt = this.alertCtrl.create({
      title: 'Do you really want to close ?',
      enableBackdropDismiss: false,
      inputs: [{
        name: 'comment',
        placeholder: 'Write short description'
      }],
      buttons: [{
        text: 'No',
        handler: data => { }
      }, {
        text: 'Yes',
        handler: (data) => {
          if (data.comment === "") {
            this.nl.showToast("write any comment to close");
            return;
          }
          this.closeActionSheet(complaint, data);
        }
      }]
    });
    prompt.present();
  }

  closeActionSheet(complaint, closeComplaintReason) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.complaintClose(complaint, closeComplaintReason);
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    actionSheet.present();
  }

  openSatisfiedModal(complaint): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you Satisfied ?',
      buttons: [{
        text: 'YES',
        icon: 'ios-paper-outline',
        handler: () => {
          this.satisfiedActionSheet(complaint);
        }
      }, {
        text: 'CANCEL',
        icon: 'md-close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    actionSheet.present();
  }

  satisfiedActionSheet(complaint) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.complaintSatisfy(complaint);
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    actionSheet.present();
  }

  openCommentModal(complaint) {
    if (this.nl.getHeaderText() == "complaint") {
      this.stringvar = "cmp";
    }
    if (this.nl.getHeaderText() == "suggestion") {
      this.stringvar = "sgsyour";
    }
    this.nl.showLoader();
    this.c.getComments(complaint.id).subscribe((response) => {
      this.nl.hideLoader();

      if (response.status == 204) {
        response = [];
      }

      //todo nilansh 

      this.pouchdbservice.addArrayOfObjectsToDoc(response, complaint.id, this.stringvar + "cmt_");
      // console.log("see res", response);
      // console.log("see complaint", complaint);
      // console.log("seee header text: ", this.nl.getHeaderText());
      let Comment = this.modalCtrl.create(CommentModal, { comments: response, data: complaint });
      Comment.onDidDismiss((data) => {
        let that=this;
        if (this.nl.getHeaderText() == "complaint") {
          this.stringvar = "cmp_";
        }
        if (this.nl.getHeaderText() == "suggestion") {
          this.stringvar = "sgsyour_";
        }
        alert("dismissing");
        if (!data) { return; }

        console.log("dataaaaaaaaaaaaaa from view modal: ", data);
        this.pouchdbservice.findDoc(data["id"], this.stringvar ).then(function(doc){
          console.log("see doc: ",doc);
          let obj=doc;
          that.pouchdbservice.deleteDoc(doc).then(function(){
            console.log("deleted: ");
            obj["commentCount"]=data["commentCount"];
            delete obj["_rev"];
            delete obj["_id"];
            console.log("see final obj before adding: ",obj);
            that.pouchdbservice.addSingle(obj,that.stringvar ,data["id"]);
          });
        });
      })
      Comment.present();

    }, (err) => {
      this.nl.onError(err);
      let that = this;
      this.pouchdbservice.findDoc(complaint.id, this.stringvar + "cmt_").then(function (res) {

        var outputArray = that.convertObjToArray(res);
        console.log("data from db: ", outputArray);
        let Comment = that.modalCtrl.create(CommentModal, { comments: outputArray, data: complaint });
        Comment.present();
      });
    });
    /*//nilansh 
        this.nl.showLoader();
        this.c.getCommentsObjectWithHeader(complaint.id).subscribe((response)=>{
          this.nl.hideLoader();
          alert("see console response on success");
          console.log(response);
          console.log(response.json());
          var temp=response.json();
          console.log(temp.status);
          this.pouchdbservice.addSingle(response,"cmpcmt_",complaint.id);
          let Comment = this.modalCtrl.create(CommentModal, {comments: response.json(), data: complaint});
          Comment.present();
        },(err)=>{
          this.nl.onError(err);
          let that =this;
          this.pouchdbservice.findDoc(complaint.id,"cmpcmt_").then(function(res){
            alert("see after fetching:");
            console.log("qty going in comments: i.e. res: ",res);
          });
        });*/

  }

  convertObjToArray(res) {
    var resArray = [];
    var len = res["length"];
    for (var i = 0; i < len; i++) {
      resArray[i] = res[i];
    }
    if (len == 0) {
      alert("len 0");
      resArray = [];
    }
    return resArray;
  }

}
