/**
  * dialog-publish.js
  *
  * changelog
  * 2014-04-11[16:36:51]:created
  *
  * @info yinyong,osx-x64,UTF-8,10.129.165.74,js,/Volumes/yinyong/focus/lpeditor/static/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define(['dialog','disk','setting'], function(Dialog , DiskManager , Setting) {
 
    var publishDialog = new Dialog('#dialog-publish',{
        minHeight:168,
        minWidth:737
    });

    $.extend(publishDialog,{
        init:function(){
            var self = this;
             self.m$lpageUrl = self.m$content.find('input[name=vlpageUrl]');
             self.m$lpageFl = self.m$content.find('input[name=lpageFl]');
             self.m$lpageName = self.m$content.find('input[name=lpageName]');

             self.m$content.find('form').submit(function(e){

                $(this).find('input[name=lpageUrl]').val(self.m$lpageUrl.val()+"?fl="+ self.m$lpageFl.val());
                return true;
             });


            DiskManager.listen(EVT_LOADED,self.onLoaded,self);
            DiskManager.listen(EVT_CREATED,self.onCreated,self);
            Setting.listen('settingchanged',self.settingChanged,self);
            return self;
        },
        /**
         * We need to show the ID when a new profile is created.
         * @param  {[type]} evt   
         * @param  {[type]} evtObj
         * @param  {[type]} args  
         */
        onCreated:function(evt,evtObj,args){
            var url ="http://wan.sogou.com/static/nav/"+args[1]+".html";
            this.m$lpageUrl.val(url);
        },
                /**
         * We need to show ID&description when a profile is loaded.
         * @param  {[type]} evt   
         * @param  {[type]} evtObj
         * @param  {[type]} args  
         */
        onLoaded:function(evt,evtObj,args){
            var id=args[1];
            var url ="http://wan.sogou.com/static/nav/"+id+".html";
            this.m$lpageUrl.val(url);
        },
        settingChanged:function (evt,evtObj,args){
            if('flashUrl' === args[0].key){
                var url = args[0].newVal||"";
                url = url.split('?')[0];
                url.match(/\/([^\s\\\/]+?)\.swf$/);
                if(RegExp.$1){
                    this.m$lpageFl.val(RegExp.$1);
                }
            }else if('title' === args[0].key){
                this.m$lpageName.val(args[0].newVal||"");
            }
        }
    });
 

    return publishDialog.init();
});