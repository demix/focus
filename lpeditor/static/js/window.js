/**
  * window.js
  *
  * changelog
  * 2014-03-05[21:44:00]:created
  *
  * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong/focus/lpeditor/static/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define([],function(){

    var dockShow=false;
    $('.home').click(function(){
        if(dockShow){
            $('.dock').stop().animate({width:0});
            dockShow=false;
        }else{
             $('.dock').stop().animate({width:'80%'});
             dockShow=true;
        }
    });

    return {
        start:function(){

        }
    };
});