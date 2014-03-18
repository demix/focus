'use strict';

var swig = require('swig');
var express = require('express');
var path=require('path');
var db = require('../common/utils/db');


var app = express();

app.engine('tpl' , swig.renderFile);
app.set('view engine' , 'tpl');
app.set('views' , __dirname + '/views');

app.use(express.cookieParser());
//app.use(express.session());
app.use(express.bodyParser());
//app.use(require('less-middleware')({ src: path.join(__dirname, 'static') }));
app.use( '/static', express.static(__dirname + '/static'));
app.use( '/common', express.static(__dirname + '/../common'));

//app.get('*' , require('../common/controllers/common').get);
app.post('/preview', require('./controllers/index').preview);
app.get('/', require('./controllers/index').get);
//app.get(/api\/(\w+)\/(.*)/, require('./controllers/api').get);



//if(process.env.NODE_ENV == 'development'){
    app.set('view cache', false);
    swig.setDefaults({cache: false});
    let livereload = require('livereload');
//}


db.connect(function(){
    app.listen(3220);
});

