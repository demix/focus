/**
  * dialog-tree.js
  *
  * changelog
  * 2014-03-07[11:33:26]:created
  *
  * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong-1/focus/lpeditor/static/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define(['dialog','listener','editor','jquery-ztree'],function(Dialog,Listener,Editor){
    var treeDialog = new Dialog('#dialog-tree');

    var setting = {
        view: {
            selectedMulti: false
        },
        callback: {
            onClick: function(event, treeId, treeNode) {
                console.log('you are clicking at "%s"',treeNode.id)
            }
        }
    };

    var treeDialogExtension = {
        init:function(){
            $.fn.zTree.init(this.m$container.find('.content'),setting, Editor.getTreeJson());

            Editor.listen('elementadded',this.onElementAdded,this);
            Editor.listen('elementremoved',this.onElementRemoved,this);
        },
        onElementAdded: function(evt, evtObj, args) {
            
        },
        onElementRemoved: function(evt, evtObj, args) {
            
        },
    };

    $.extend(treeDialog,treeDialogExtension);
    $.extend(treeDialog,new Listener());
    treeDialog.init();
    return treeDialog;
});