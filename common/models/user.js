var db = require('../utils/db');


/**
 user:{
 sid:
 uname:
 role:
 gitlabacc:
 gitlabpwd:
 }

 */

var ERROR_CODE = {
    'none':0,
    'user_exist':1,
    'unknown':99
};

var getBySid = function(sid , callback){
    db.getCollection('users' , function(collection){

        collection.find({
            sid:sid
        }).toArray(function(err,items){
            callback(items.length ? items[0] : null);
        });

    });
};


exports.add = function(info , callback){
    db.getCollection('users' , function(collection ){
        getBySid(info.sid , function(item){
            collection.update({sid:info.sid} , info , {safe:true, upsert:true} , function(err ){
                var status ,id;
                if(!err){
                    status = ERROR_CODE['none'] ;
                } else{
                    status = ERROR_CODE['unknown'];
                    id = null;
                }
                callback(status , info.sid);
            } );
        });

    });
};

exports.USER_TYPE = {
    1: 'Backend Engineer',
    2: 'Frontend Engineer',
    3: 'QA',
    4: 'Project Manager',
    5: 'Product Desinger'
};



exports.getBySid = getBySid;
