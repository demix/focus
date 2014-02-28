var Db = require('mongodb').MongoClient;

var db;

exports.connect = function(callback){
    Db.connect('mongodb://127.0.0.1:27017/focus' , function(err,opendb){
        if( err ) throw err;
        db = opendb;
        callback && callback();
    });
    
};



exports.getCollection = function(collection, operate){
    var cl = db.collection(collection);
    operate(cl);
};


