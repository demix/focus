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

    var saveDialog = new Dialog('#dialog-save',{
        resizable:false
    });

    $.extend(saveDialog,{
        init:function(){
            this.m$profileId=$('#profile-id');
            this.m$profileDesc=$('#profile-desc');
            this.m$profileInit=$('#profile-init');
            DiskManager.listen(EVT_LOADED,this.onLoaded,this);
            DiskManager.listen(EVT_SAVED,this.onSaveStatus,this);
            DiskManager.listen(EVT_SAVE_ERROR,this.onSaveStatus,this);
            DiskManager.listen(EVT_CREATED,this.onCreated,this);
            this.initEvt();
            return this;
        },
        initEvt:function(){
            var self = this;
            //Save profile to server.
            this.m$content.find('form').submit(function(e){
                var id =  self.m$profileInit.prop('checked')?null:self.m$profileId.val();
                var desc = self.m$profileDesc.val();

                var payload={
                    elements:Editor.dump(),
                    setting:Setting.toJSON(),
                    desc:desc
                };

                DiskManager.save(id,JSON.stringify(payload));

                 self.m$profileInit.prop('checked',false);
                e.preventDefault();
            });
            return this;
        },
        /**
         * We need to show the ID when a new profile is created.
         * @param  {[type]} evt   
         * @param  {[type]} evtObj
         * @param  {[type]} args  
         */
        onCreated:function(evt,evtObj,args){
            this.m$profileId.val(args[0]);
        },
        /**
         * [onSaved description]
         * @param  {[type]} evt   
         * @param  {[type]} evtObj
         * @param  {[type]} args  
         */
        onSaveStatus:function(evt,evtObj,args){
          if(EVT_SAVE_ERROR===evt)
            this.toast('保存失败');
          else if(EVT_SAVED===evt)
            this.toast('保存成功',true);
        },
        /**
         * We need to show ID&description when a profile is loaded.
         * @param  {[type]} evt   
         * @param  {[type]} evtObj
         * @param  {[type]} args  
         */
        onLoaded:function(evt,evtObj,args){
            var data = args[0],id=args[1];
            this.m$profileId.val(id);
            this.m$profileDesc.val(data.desc);
        }
    });

    return saveDialog.init();
});