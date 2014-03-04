var request = require('request');
var qs = require('querystring');
var _ = require('lodash-node');

var userModel = require('../models/user');

const URL_PREFIX = 'http://gitlab.upd.sogou-inc.com/api/v3/';

var base_config_generator = function(conf){
    var base = {
        hostname:'gitlab.upd.sogou-inc.com'
    };
    var target = _.assign(_.clone(base) , conf);
    if( conf.method.toLowerCase() == 'post' && !conf.headers ){
        target.headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        };
    }
    return target;
};

exports.getPrivateToken = function(user , callback){
    var doPost = function(user , callback){
        request.post({url:URL_PREFIX + 'session', form:{email:user.gitlabacc, password:user.gitlabpwd}} , function(e,r,body){
            if(r.statusCode >= 300){
                callback(null);
            }else{
                callback(JSON.parse(body).private_token);
            }
        });
    }

    if( typeof user == 'string' ){
        userModel.getBySid(user,function(user){
            doPost(user , callback);
        });
    }else{
        doPost(user,callback);
    }

};


exports.getProjects = function(token){
    request.get( URL_PREFIX + 'projects?' + qs.stringify({
        private_token: token
    }) , function(){
        console.log(arguments)
    } );
};
