var userModel = require('../../common/models/user');


exports.get = function(req,res){
    
    userModel.getBySid(res.locals.sid , function(user){
        res.render('profile' , {
            uname: user.uname
        });
    });
};


