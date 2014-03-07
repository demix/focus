
var username = null;

var userModel = require('../models/user.js');
//var config = require('../config');

exports.get = function(req,res,next){
    
    if(process.env.NODE_ENV == 'development'){
        console.log(req.path);
    }


    var ua =req.headers['user-agent'];
    if( (!/chrome/i.test(ua) || !/safari/i.test(ua) ) && req.path.indexOf('browser-not-support') == -1 ){
        res.redirect('/common/static/html/browser-not-support.html');
    }

    var cookie = req.cookies['jpassport-sp'];

    username = /{username:(\w+)@sogou.*/.exec(cookie);
    username = username && username[1] || '';

    res.locals.sid = username;

    userModel.getBySid(username , function(user){
        if( (!user) && req.path.indexOf('/login')==-1 ){
            res.redirect('/ocean/login');
        }else{
            next();
        }
    });
};




exports.fetch = function(){
    return {
        sid:username // sogou id
    };
};

exports.checkPermission = function(res , name){
/*    if( name == username || username == config.admin ){
        return true;
    }else{
        res.redirect('/share/404');
    }*/
};
