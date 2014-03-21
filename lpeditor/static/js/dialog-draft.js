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
      this.m$content.delegate('li', 'dblclick', function(e) {
        var $t = $(e.target);
        var timestamp = +$t.attr('data-stamp');
        DraftManager.getDraft(timestamp);
      });
    },
    onEditorLoadChange: function(evt, evtObj, args) {
      if ('loading' === evt) {
        this.title('装载中');
      } else if ('loaded' === evt) {
        this.title('草稿');
      }
    },
    onDraftListChanged: function(evt, evtObj, args) {
      var self = this;
      var timestampList = args[0];
      self.m$content.empty();
      timestampList.forEach(function(time, index) {
        self.m$content.append('<li data-stamp=' + time + '>' + Utils.formatDate(new Date(time), 'yyyy年mm月dd日 aphh时ii分ss秒') + '</li>');
      });
    }
  });

  return draftDialog.init();
});