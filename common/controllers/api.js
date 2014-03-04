var request = require('request');
var qs = require('querystring');
var _ = require('lodash-node');


const URL_LIST = {
    'gitlab': 'http://gitlab.upd.sogou-inc.com/api/v3/'
};

exports.get = function(req , res){
    console.log(req.params[1],111)
    request.get( URL_LIST[req.params[0]] + req.params[1] , {
        qs: req.query
    } , function(e,r,body){
        if(r.statusCode >= 300){
            res.send(500);
        }else{
            res.send(body);
        }
        
    } );

};
