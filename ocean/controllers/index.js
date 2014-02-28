var common = require('../../common/controllers/common');
var userModel = require('../../common/models/user');

exports.get = function(req,res){
    var sid = common.fetch().sid;

    res.redirect('/ocean/profile');
};
