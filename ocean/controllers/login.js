

var userModel = require('../../common/models/user');
var gitlab = require('../../common/utils/gitlab');
var _ = require('lodash-node');


exports.get = function(req,res){
    
    userModel.getBySid(res.locals.sid , function(item){
    
        res.render('login' , _.assign({
            sid: res.locals.sid,
            types: userModel.USER_TYPE
        } , item));

    });
};


exports.post = function(req,res){
    gitlab.getPrivateToken(req.body , function(token){
        if( !token ){
            res.json({status:-1 , msg:'Invalid gitlab Account.'});
        }else{
            userModel.add(req.body , function( status,  sid ){
                res.json({status:status,sid:sid});
            });
        }
    });
    

};
