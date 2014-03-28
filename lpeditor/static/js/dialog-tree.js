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
define(['dialog', 'listener', 'editor', 'dialog-prop','jquery-ztree'], function(Dialog, Listener, Editor,PropDialog) {
  var treeDialog = new Dialog('#dialog-tree');

  //I really why the tree cannot be dragged and dropped,even I set all the parameters.
  //I guess there is one jquery plugin affecting.
  var treeSetting = {
    treeId: 'treeEle',
    edit: {
      enable: true,
      showRemoveBtn: false,
      showRenameBtn: false,
      drag:{
        isCopy:false,
        isMove:true
      }
    },
    view: {
      selectedMulti: false
    },
    callback: {
      onClick: function(event, treeId, treeNode) {
        Editor.selectElement(String(treeNode.id));
      },
      onDblClick:function(event, treeId, treeNode){
        PropDialog.show();
      }
    }
  };

  var treeDialogExtension = {
    init: function() {
      this.createTree();
      Editor.listen('elementadded', this.onElementAdded, this);
      Editor.listen('elementremoved', this.onElementRemoved, this);
      Editor.listen('focuschanged', this.onFocusChanged, this);
      Editor.listen('loaded', this.onEditorLoaded, this);

      this.initEvt();
      return this;
    },
    initEvt:function(){
      var self =this;
      self.m$bar.find('.delete').click(function(e){
        var nodes = self.mTree.getSelectedNodes();
        var id = nodes[0]&&nodes[0].id,ele;
        if(id&&(ele=Editor.getElementById(id))){
          if(!ele.readonly())
            {
              Editor.removeElementById(id);
            }else{
              self.toast('该元素不可删除');
            }
        }
      });
      return self;
    },
    /**
     * [createTree description]
     * @return {Tree}
     */
    createTree: function() {
      $.fn.zTree.destroy('treeEle');
      return this.mTree = $.fn.zTree.init(this.m$content, treeSetting, Editor.getTreeJson());
    },
    /**
     * We need to refresh the tree when editor reloaded.
     * @param  {[type]} evt
     * @param  {[type]} evtObj
     * @param  {[type]} args
     */
    onEditorLoaded: function(evt, evtObj, args) {
      this.createTree();
    },
    /**
     * [onElementAdded description]
     * @param  {[type]} evt   
     * @param  {[type]} evtObj
     * @param  {[type]} args
     */
    onElementAdded: function(evt, evtObj, args) {
      this.createTree();
    },
    /**
     * [onElementRemoved description]
     * @param  {[type]} evt   
     * @param  {[type]} evtObj
     * @param  {[type]} args  
     */
    onElementRemoved: function(evt, evtObj, args) {
      this.createTree();
    },
    /**
     * [onFocusChanged description]
     * @param  {[type]} evt   
     * @param  {[type]} evtObj
     * @param  {[type]} args  
     */
    onFocusChanged: function(evt, evtObj, args) {
      var ele = args[1];
      if (ele) {
        var node = this.mTree.getNodesByFilter(function(n) {
          return n.id == ele.getId()
        }, true);

        node ? this.mTree.selectNode(node) : console.error('cannot find ', ele.getId(), ' in tree');
      } else {
        console.error('Focus element should not be ', ele);
      }
    }
  };

  $.extend(treeDialog, treeDialogExtension);
  $.extend(treeDialog, new Listener());
  treeDialog.init();
  return treeDialog;
});