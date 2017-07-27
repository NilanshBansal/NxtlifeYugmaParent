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
    // url = 'http://nxtlife-testing.ind-cloud.everdata.com//parent/36926627705/complaint/page/1';
    //opts = { live: true, retry: true };

    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('parent');
    }

    add(res, stringvar) {
        alert("deleting before addding " + stringvar);
        //this.delete_all(stringvar);
        //code for deleting

        let that=this;
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

            that.allComplaints = res;

        var len = that.allComplaints.length;
        for (var i = 0; i < len; i++) {
            that.allComplaints[i]["_id"] = (stringvar + that.allComplaints[i]["id"].toString());
            that._db.put(that.allComplaints[i]);
        }



            //done
        });


        /*this.allComplaints = res;

        var len = this.allComplaints.length;
        for (var i = 0; i < len; i++) {
            this.allComplaints[i]["_id"] = (stringvar + this.allComplaints[i]["id"].toString());
            this._db.put(this.allComplaints[i]);
            alert("added");
        }*/

    }

    addSingle(obj,stringvar)
    {
        obj["_id"]=stringvar+obj["id"].toString();
        console.log("see object after adding " , obj);
        this._db.put(obj);
        alert("added");
    }

    /*syncData() {
        // var remote = new PouchDB(this.url, {
        //     ajax: {
        //         headers: new Headers({
        //             'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        //         })
        //     }
        // });
        var remote = new PouchDB(this.url, {
            ajax: { headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }) }
        });

        var options = new RequestOptions({
            'headers': new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        })
        this._db.replicate.from(remote).on('complete', function (info) {
            // then two-way, continuous, retriable sync
            this._db.sync(this.url, this.opts)
                .on('change', alert("onSyncChange"))
                .on('paused', alert("onSyncPaused"))
                .on('error', alert("onSyncError"));
        }).on('error', alert("onSyncError"));
    
    }
*/

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

        //working code
        //  let that =this;
        // return this._db.allDocs({ 
        //   include_docs: true,  
        //   startkey: stringvar, 
        //   endkey:  stringvar + '\uffff'  
        // }).then(function(obj){ 

        //   var docs = obj.rows.map(function(row){ 
        //     //console.log("dekhle bhai",row);
        //    /* return { 
        //       _id: row.id, 
        //       _rev: row.rev, 
        //       _deleted: true 
        //     };*/ 
        //     that._db.remove(row.doc);
        //   }); 
        //   /*console.log("see returned value ",that._db.bulkDocs(docs));
        //   return that._db.bulkDocs(docs); 
        // }).then(function(responses){ 
        //     console.log("hello hi");
        //   return responses.every(function(response){ 
        //     response.ok; 
        //   }); */
        // });
        //working till here
        let that=this;
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
    findDoc(res,stringvar)
    {
        let that =this;
        var ans=this._db.get(stringvar + res[0].id);
        console.log(ans);
    }


    delete() {
        this._db.destroy();
    }

    public putInArray(response) {
        var len = response.length;

        for (var i = 0; i < len; i++) {
            this.getComplaints[i] = response[i].doc;
        }
        return this.getComplaints;
    }



}