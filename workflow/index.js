'use strict';

var swig = require('swig');
var express = require('express');

var db = require('../common/utils/db');


var app = express();

app.engine('tpl' , swig.renderFile);
app.set('view engine' , 'tpl');
app.set('views' , __dirname + '/views');

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use( '/static', express.static(__dirname + '/static'));
app.use( '/common', express.static(__dirname + '/../common'));
app.use( '/packages', express.static(__dirname + '/packages'));

app.get('*' , require('../common/controllers/common').get);
app.get('/', require('./controllers/index').get);
app.get('/project/:action', require('./controllers/project').get);
app.get(/quick\/?(.*)/,require('./controllers/index').get);
app.get(/formal\/?(.*)/,require('./controllers/index').get);



if(process.env.NODE_ENV == 'development'){
    app.set('view cache', false);
    swig.setDefaults({cache: false});
    let livereload = require('livereload');
    //let server = livereload.createServer({exts:['tpl','css']});

    //server.watch(__dirname + '/../common');
    //server.watch(__dirname + '/');

}


db.connect(function(){
    app.listen(3202);
});

