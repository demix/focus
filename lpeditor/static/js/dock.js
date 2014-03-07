/**
  * dock.js
  *
  * changelog
  * 2014-03-07[12:15:10]:created
  *
  * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong-1/focus/lpeditor/static/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define(['dialog-tree'],function(DialogTree){
    var Dock={
        init:function(){
            this.m$dock=$('.dock');
            this.m$dockItems=this.m$dock.find('.dock-item');
            this.initEvent();
            return this;
        },
        initEvent:function(){

          this.m$dockItems.click(function(e){
            console.log(e)
            switch($(this).attr('data-action')){
              case 'structure': DialogTree.toggle();
            }

           
          });

        },
        show:function(){
             var self =this;
            self.m$dock.show().stop().animate({width:'80%'},'fast',function(){
                self.m$dockItems.show();
            });
        },
        hide:function(){
            var self =this;
            self.m$dock.stop().animate({width:0},'fast',function(){
                self.m$dock.hide();
                self.m$dockItems.hide();
            });
        }
    };
    return Dock.init();;
});