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
define(['dialog','text!tpl/tools.html','jquery-ztree','spectrum'],function(Dialog,Tpl_Tools){

    var toolsDialog = new Dialog('#dialog-tools');

    $.extend(toolsDialog,{
        init:function(){
            this.m$toolsList = this.m$content.html(Tpl_Tools).find('.tools-list');
            this.m$panels = this.m$toolsList.find('li');
            this.initEvt();
            this.initPanels();
            return this;
        },
        initEvt:function(){
          var self =this;
           self.m$panels.eq(0).find('.item').click(function(e){
              var index = $(this).index();
              self.m$panels.hide().eq(index+1).show();
              self.m$bar.find('.showall').prop('disabled',false);
           });

           self.m$bar.find('.showall').prop('disabled',true).click(function(e){
             self.m$panels.hide().first().show();
             $(this).prop('disabled',true);
           });

           return self;
        },
        initPanels:function(){
          $('.jpicker').spectrum({
            flat:true,
            showInput:true,
            showPalette:true,
            preferredFormat:'hex',
          });
          return this;
        }
    });

    return toolsDialog.init();
});