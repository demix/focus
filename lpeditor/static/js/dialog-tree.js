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
define(['dialog', 'listener', 'editor', 'jquery-ztree'], function(Dialog, Listener, Editor) {
  var treeDialog = new Dialog('#dialog-tree');

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
      }
    }
  };

  var treeDialogExtension = {
    /**
     * [init description]
     * @return {[type]} [description]
     */
    init: function() {
      this.createTree();
      Editor.listen('elementadded', this.onElementAdded, this);
      Editor.listen('elementremoved', this.onElementRemoved, this);
      Editor.listen('focuschanged', this.onFocusChanged, this);
      Editor.listen('loaded', this.onEditorLoaded, this);
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
     * @param  {[type]} evt    [description]
     * @param  {[type]} evtObj [description]
     * @param  {[type]} args   [description]
     * @return {[type]}        [description]
     */
    onElementAdded: function(evt, evtObj, args) {
      this.createTree();
    },
    /**
     * [onElementRemoved description]
     * @param  {[type]} evt    [description]
     * @param  {[type]} evtObj [description]
     * @param  {[type]} args   [description]
     * @return {[type]}        [description]
     */
    onElementRemoved: function(evt, evtObj, args) {
      console.debug('Remove nodes from tree');
      this.createTree();
    },
    /**
     * [onFocusChanged description]
     * @param  {[type]} evt    [description]
     * @param  {[type]} evtObj [description]
     * @param  {[type]} args   [description]
     * @return {[type]}        [description]
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