/**
  * background.js
  *
  * changelog
  * 2014-03-08[01:36:32]:created
  *
  * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define([],function(){
    var Background = {
        /**
         * [init description]
         * @return {[type]} [description]
         */
        init:function(){
            this.m$iframe = $('#bg_iframe');
            return this;
        },
        /**
         * [load description]
         * @param  {[type]} src [description]
         * @return {[type]}     [description]
         */
        load:function(src){
            if(/^https?:\/\//.test(src)){
                this.m$iframe.attr('src',src);
                return true;
            }
            return false;
        },
        /**
         * [reload description]
         * @return {[type]} [description]
         */
        reload:function(){
            var src=this.m$iframe.attr('src');
            this.m$iframe[0].src= src;
        }
    };
    return window.Background=Background.init().load('http://wan.sogou.com/nav.do?fl=sxd_fl_18&fid=100&tf=0&ab=0&source=0001000100002&gid=2&sid=40&pid=1663732439');
});