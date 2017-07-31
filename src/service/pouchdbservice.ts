import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';


window["PouchDB"] = PouchDB;



@Injectable()
export class PouchDbService {
    private _db;
    private allComplaints: any[] = [];
    private getComplaints: any[] = [];


    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('parent');
    }

    add(res, stringvar) {
        //code for deleting
        console.log("inside add",res);
        let that = this;
        this._db.allDocs({
            include_docs: true,
            startkey: stringvar,
            endkey: stringvar + '\uffff'
        }).then(function (result) {
            return Promise.all(result.rows.map(function (row) {
                return that._db.remove(row.doc);
            }));
        }).then(function (arrayOfResults) {

            that.allComplaints = res;
            console.log("see res",that.allComplaints);
            var len = that.allComplaints.length;
            for (var i = 0; i < len; i++) {
                that.allComplaints[i]["_id"] = (stringvar + that.allComplaints[i]["id"].toString());
                that._db.put(that.allComplaints[i]);
            }

        });
    }

    addWithoutDelete(res, stringvar) {
        var moreComplaintsArray=[];
        moreComplaintsArray=res;
        var len = res.length;
        alert("length is: "+ len);
        for (var i = 0; i < len; i++) {
            moreComplaintsArray[i]["_id"] = (stringvar + res[i]["id"].toString());
            this._db.put(moreComplaintsArray[i]);
        }

    }

    addSingle(obj, stringvar, id) {
        obj["_id"] = stringvar + id.toString();
        console.log("onject in adding is: ", obj);
        this._db.put(obj).then(function (func) {
            console.log("success adding", func);
        }, (err) => {
            console.log("add single error", err);
        });
    }

    addSingleWithDelete(obj, stringvar, id) {
        let that = this;
        this._db.get(stringvar + id).then(function (doc) {
            that._db.remove(doc);
        }).then(function (result) {
            that.addSingle(obj, stringvar, id);

        }, (err) => {
            console.log("in error");
            this.addSingle(obj, stringvar, id);

        });
    }

    addArrayOfObjectsToDoc(response, id, stringvar) {
        //deleting earlier one
        //let that = this;
        var obj = {};
        var len = response.length;
        obj["length"] = len;

        for (var i = 0; i < len; i++) {
            obj[i] = response[i];
        }
        this.addSingleWithDelete(obj, stringvar, id);
        /*this._db.get(stringvar + id).then(function (doc) {
            that._db.remove(doc);
        }).then(function (result) {
            that.addSingle(obj, stringvar, id);

        }, (err) => {
            console.log("in error");
            this.addSingle(obj, stringvar, id);

        });*/
    }

    getAllComplaints(stringvar) {
        alert("getting all " + stringvar);
        let that = this;
        return this._db.allDocs({
            include_docs: true,
            startkey: stringvar,
            endkey: stringvar + '\uffff'
        }).then(function (result) {
            return that.putInArray(result.rows);
        }).catch(function (err) {
            console.log(err);
        });

    }


    delete_all(stringvar) {

        let that = this;
        this._db.allDocs({
            include_docs: true,
            startkey: stringvar,
            endkey: stringvar + '\uffff'
        }).then(function (result) {
            return Promise.all(result.rows.map(function (row) {
                return that._db.remove(row.doc);
            }));
        }).then(function (arrayOfResults) {
            console.log("All docs have really been removed() now");
        });

    }
    findDoc(id, stringvar) {
        var ans = this._db.get(stringvar + id);
        return ans;
    }
    deleteDoc(doc) {
        console.log("inside delete func", doc);
        return this._db.remove(doc);
    }


    destroyDb() {
        this._db.destroy();
    }

    putInArray(response) {
        var len = response.length;
        alert("length is" + len);
        for (var i = 0; i < len; i++) {
            this.getComplaints[i] = response[i].doc;
        }
        if (len == 0) {
            this.getComplaints = [];
        }
        return this.getComplaints;
    }

    /*
        commentCountChange(stringvar,id){
            let that=this;
            var obj;
    
            this._db.get(stringvar + id).then(function (result) {
              obj=result;
              var len=result["length"];
              obj[len]={};
              obj[len]["createdAt"]="that.comments[that.comments.length-1].createdAt.toString()";
              obj[len]["comment"]="that.comments[that.comments.length-1].comment";
              obj[len]["parentId"]="that.comments[that.comments.length-1].parentId";
              obj[len]["employeeName"]="that.comments[that.comments.length-1].employeeName";
              obj[len]["parentName"]="";
              obj[len]["employeeId"]="";
              obj[len]["employeeNickName"]="";
              obj[len]["parentPicUrl"]="";
              
              obj["length"]=len+1;
              console.log("see res: ",obj);
                that._db.remove(result);
            }).then(function (res) {
                console.log("after removing");
                that.addSingle(obj, stringvar, id);
    
            }, (err) => {
                console.log("in error",err);
               // this.addSingle(obj, stringvar, id);
    
            });
        }
    */

}