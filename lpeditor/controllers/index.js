/**
  * index.js
  *
  * changelog
  * 2014-03-18[12:12:17]:created
  *
  * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/controllers
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */

exports.get = function(req, res){
  return res.render('index', {});
};

exports.preview = function(req, res){
    var css=req.body.css||'';
    var html=req.body.html||'';
  return res.render('preview', {css:css,html:html});
};