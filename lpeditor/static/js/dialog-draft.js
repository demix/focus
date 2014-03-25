/**
 * dialog-draft.js
 *
 * changelog
 * 2014-03-21[12:11:11]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['editor', 'dialog', 'draft', 'utils'], function(Editor, Dialog, DraftManager, Utils) {
  var draftDialog = new Dialog('#dialog-draft', {
    resizable: false,
    //show list when showed
    onShow: function() {
      DraftManager.getDraftList();
    }
  });

  $.extend(draftDialog, {
    init: function() {
      DraftManager.listen('draftlistchanged', this.onDraftListChanged, this);
      Editor.listen('loading', this.onEditorLoadChange, this);
      Editor.listen('loaded', this.onEditorLoadChange, this);
      this.initEvt();
      return this;
    },
    initEvt: function() {
      var self = this;
      var timeout;
      self.m$content.delegate('li', 'dblclick', function(e) {
        clearTimeout(timeout);
        var $t = $(e.target);
        var timestamp = +$t.attr('data-stamp');
        DraftManager.getDraft(timestamp);
      }).delegate('li', 'click', function(e) {
        clearTimeout(timeout);
        timeout = setTimeout((function(){
          return function(){
          self.toast('双击条目加载对应草稿', true, 4000);
          };
        })(),300);
      });
      return self;
    },
    /**
     * Show status of loading
     * @param  {[type]} evt    [description]
     * @param  {[type]} evtObj [description]
     * @param  {[type]} args   [description]
     */
    onEditorLoadChange: function(evt, evtObj, args) {
      if ('loading' === evt) {
        this.title('装载中');
      } else if ('loaded' === evt) {
        this.title('草稿');
      }
    },
    /**
     * Show list on the dialog
     * @param  {[type]} evt    [description]
     * @param  {[type]} evtObj [description]
     * @param  {[type]} args   [description]
     */
    onDraftListChanged: function(evt, evtObj, args) {
      var self = this;
      var timestampList = args[0];
      self.m$content.empty();
      timestampList.forEach(function(time, index) {
        self.m$content.append('<li data-stamp=' + time + '>' + (1 + index) + '. ' + Utils.formatDate(new Date(time), 'yyyy年mm月dd日 aphh时ii分ss秒') + '</li>');
      });
    }
  });

  return draftDialog.init();
});