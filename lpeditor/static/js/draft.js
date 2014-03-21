/**
 * draft.js
 *
 * changelog
 * 2014-03-19[20:23:14]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['setting', 'editor', 'listener'], function(Setting, Editor, Listener) {

    var DraftManager = {
      __mLastDraft: null,
      /**
       * [init description]
       * @return {this}
       */
      init: function() {
        var self = this;
        var w = self.mWorker = new Worker('/static/js/work-draft.js');
        w.onmessage = function(event) {
          switch (event.data.cmd) {
            case 'showDraftList':
              self.trigger('draftlistchanged', event.data.payload);
              break;
            case 'loadDraft':
              var draft = event.data.payload;
              Editor.load(draft.elements);
              //load setting
              break;
            default:
              ;
          }
        };
        return this;
      },
      getDraft: function(timestamp) {
        var cmd = 'getDraft';
        this.mWorker.postMessage({
          cmd: cmd,
          payload: {
            timestamp: timestamp
          }
        });
    },
      /**
       * [saveDraft description]
       * @return {undefined}
       */
      saveDraft:function() {
        var cmd = 'saveDraft';
        var postData = {
          cmd: cmd,
          payload: {
            timestamp: Date.now(),
            elements: Editor.dump(),
            setting: Setting.toJSON()
          }
        };
        //avoid save the same twice
        if (JSON.stringify(postData) == JSON.stringify(this.__mLastDraft)) {
          return;
        }

        this.__mLastDraft = postData
        this.mWorker.postMessage(postData);
      },
      /**
       * [getDraftList description]
       * @return {undefined}v
       */
      getDraftList: function() {
        var cmd = 'getDraftList';
        this.mWorker.postMessage({
          cmd: cmd
        });
      }
  };

  $.extend(DraftManager, new Listener());
  return DraftManager.init();
});