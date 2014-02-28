var user = require('../../common/models/user');


exports.get = function(req,res){
    
    res.render('login' , {
        sid: res.locals.sid
    });
};


exports.post = function(req,res){
    user.add(req.body , function( status,  sid ){
        res.json({status:status,sid:sid});
    });
};
