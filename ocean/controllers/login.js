

var user = require('../../common/models/user');
var gitlab = require('../../common/utils/gitlab');


exports.get = function(req,res){

    
    
    res.render('login' , {
        sid: res.locals.sid,
        types: user.USER_TYPE
    });
};


exports.post = function(req,res){
    gitlab.getPrivateToken(req.body , function(token){
        if( !token ){
            res.json({status:-1 , msg:'Invalid gitlab Account.'});
        }else{
            user.add(req.body , function( status,  sid ){
                res.json({status:status,sid:sid});
            });
        }
    });
    

};
