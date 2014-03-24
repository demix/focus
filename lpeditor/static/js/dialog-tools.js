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

    var setting = {
        treeId:'xxtree',
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false,
                drag:{
                    isCopy:true,
                    isMove:true
                }
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeDrag: beforeDrag,
                beforeDrop: beforeDrop,
                onDrag:function(){console.log(arguments)},
                onDrop:function(){console.log(arguments)}
            }
        };
function beforeDrag(treeId, treeNodes) {
            for (var i=0,l=treeNodes.length; i<l; i++) {
                if (treeNodes[i].drag === false) {
                    return false;
                }
            }
            return true;
        }
        function beforeDrop(treeId, treeNodes, targetNode, moveType) {
            return targetNode ? targetNode.drop !== false : true;
        }
        
        var zNodes =[
            { id:1, pId:0, name:"随意拖拽 1", open:true},
            { id:11, pId:1, name:"随意拖拽 1-1"},
            { id:12, pId:1, name:"随意拖拽 1-2", open:true},
            { id:121, pId:12, name:"随意拖拽 1-2-1"},
            { id:122, pId:12, name:"随意拖拽 1-2-2"},
            { id:123, pId:12, name:"随意拖拽 1-2-3"},
            { id:13, pId:1, name:"禁止拖拽 1-3", open:true, drag:false},
            { id:131, pId:13, name:"禁止拖拽 1-3-1", drag:false},
            { id:132, pId:13, name:"禁止拖拽 1-3-2", drag:false},
            { id:133, pId:13, name:"随意拖拽 1-3-3"},
            { id:2, pId:0, name:"随意拖拽 2", open:true},
            { id:21, pId:2, name:"随意拖拽 2-1"},
            { id:22, pId:2, name:"禁止拖拽到我身上 2-2", open:true, drop:false},
            { id:221, pId:22, name:"随意拖拽 2-2-1"},
            { id:222, pId:22, name:"随意拖拽 2-2-2"},
            { id:223, pId:22, name:"随意拖拽 2-2-3"},
            { id:23, pId:2, name:"随意拖拽 2-3"}
        ];

    $.extend(toolsDialog,{
        init:function(){
            $.fn.zTree.init(this.m$content, setting, zNodes);
            return this;
        }
    });

    return toolsDialog.init();
});