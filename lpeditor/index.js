'use strict';

var request = require('request');
var swig = require('swig');
var express = require('express');
var path=require('path');
var db = require('../common/utils/db');
var index =require('./controllers/index');

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


app.post('/preview', index.preview);
app.all('/save', index.save);
app.all('/list', index.list);
app.all('/get', index.get);
app.all('/create', index.create);
app.all('/delete', index.delete);
app.all('/release', index.release);
app.get('/', index.index);

app.get(/\/(.*\.do.*)$/ , function(req,res){

    var querykey = Object.keys(req.query);
    var query = [];
    querykey.forEach(function(item){
        query.push(item + '=' + req.query[item]);
    });

    request({
        url: 'http://wan.sogou.com/'+req.params[0] + '?' + query.join('&'), 
        headers:{
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.76 Safari/537.36'
        }
    } , function(error,response,body){
        res.send(body);
    });
});

app.post(/\/(.*\.do.*)$/ , function(req,res){

    var querykey = Object.keys(req.body);
    var query = [];
    querykey.forEach(function(item){
        query.push(item + '=' + req.body[item]);
    });
    request({
        method:'POST',
        url: 'http://wan.sogou.com/'+req.params[0], 
        body: query.join('&'),
        headers:{
            'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.76 Safari/537.36',
            'Referer':'http://wan.sogou.com',
            'Content-type':'application/x-www-form-urlencoded'
        }
    } , function(error,response,body){
        res.send(body);
    });
});

app.get('/static/jump.html' , function(req,res){
    var querykey = Object.keys(req.query);
    var query = [];
    querykey.forEach(function(item){
        query.push(item + '=' + req.query[item]);
    });
    request({
        url:'http://wan.sogou.com/static/jump.html?' + query.join('&')
    } , function(err,response,body){
        res.send(body);
    });
});


//WTF,it does not work!
if(process.env.NODE_ENV == 'development'){
    app.set('view cache', false);
    swig.setDefaults({cache: false});
    let livereload = require('livereload');
}


db.connect(function(){
    app.listen(3220);
});

