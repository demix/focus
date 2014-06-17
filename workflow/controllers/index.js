
var gitlab = require('../../common/utils/gitlab');

exports.get = function(req,res){
    gitlab.getPrivateToken(res.locals.sid , function(token){
        if( !token ){
            res.send('err');
            //todo send to bind account
        }else{
            res.render('index' , {
                token:token
            });

        }
    });


};
