var db = require('../utils/db');


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
            if(item){
                callback(ERROR_CODE['user_exist']);
                return;
            }
            collection.insert( info , {safe:true} , function(err , objects){
                var status ,id;
                if(objects.length && objects[0]._id){
                    status = ERROR_CODE['none'] ;
                    id = objects[0].sid;
                } else{
                    status = ERROR_CODE['unknown'];
                    id = null;
                }
                callback(status , id);
            } );
        });

    });
};



exports.getBySid = getBySid;
