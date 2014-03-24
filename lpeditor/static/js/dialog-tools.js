/**
  * dialog-tools.js
  *
  * changelog
  * 2014-03-22[16:06:59]:created
  *
  * @info yinyong,osx-x64,UTF-8,192.168.1.104,js,/Volumes/yinyong/focus/lpeditor/static/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define(['dialog','jquery-ztree'],function(Dialog){

    var toolsDialog = new Dialog('#dialog-tools');

    $.extend(toolsDialog,{
        init:function(){
            return this;
        }
    });

    return toolsDialog.init();
});