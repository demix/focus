/**
  * dialog-save.js
  *
  * changelog
  * 2014-03-24[16:53:08]:created
  *
  * @info yinyong,osx-x64,UTF-8,10.129.164.209,js,/Volumes/yinyong/focus/lpeditor/static/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define(['dialog','disk','editor','setting'],function(Dialog,DiskManager,Editor,Setting){

    var saveDialog = new Dialog('#dialog-save');

    $.extend(saveDialog,{
        init:function(){
            this.m$profileId=$('#profile-id');
            this.m$profileDesc=$('#profile-desc');
            DiskManager.listen(EVT_LOADED,this.onLoaded,this);
            DiskManager.listen(EVT_CREATED,this.onCreated,this);
            this.initEvt();
            return this;
        },
        initEvt:function(){
            var self = this;
            this.m$content.find('form').submit(function(e){
                var id =  self.m$profileId.val();
                var desc = self.m$profileDesc.val();

                var payload={
                    elements:Editor.dump(),
                    setting:Setting.toJSON(),
                    desc:desc
                };

                DiskManager.save(id,JSON.stringify(payload));

                e.preventDefault();
            });
            return this;
        },
        onCreated:function(evt,evtObj,args){
            this.m$profileId.val(args[0]);
        },
        onLoaded:function(evt,evtObj,args){
            var data = args[0],id=args[1];
            this.m$profileId.val(id);
            this.m$profileDesc.val(data.desc);
        }
    });

    return saveDialog.init();
});