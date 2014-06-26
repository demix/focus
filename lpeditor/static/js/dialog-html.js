/**
 * Copyright (C) 2014 yanni4night.com
 * dialog-html.js
 *
 * changelog
 * 2014-06-25[10:04:05]:authorized
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */


define(['dialog', 'disk', 'utils', 'editor', 'canvas'], function(Dialog, DiskManager, Utils, Editor, Canvas) {
  var HtmlDialog = new Dialog('#dialog-html', {
    minHeight: 420,
    minWidth: 740,
    resizable: false
  });

  var flashes = [];

  $.extend(HtmlDialog, {
    init: function() {

      this.m$newFlash = this.m$content.find('.new-flash');
      this.m$dialogList = this.m$content.find('.dialog-list');
      this.m$flashList = this.m$content.find('.flash-list');
      this.m$onlineList = this.m$content.find('.online-list');
      this.m$generateBtn = this.m$content.find('button.generate');

      DiskManager.listen(EVT_LOADED_LIST, this.onListLoaded, this);
      DiskManager.listen(EVT_LOADED, function() {
        this.toast('加载成功', true, 3000);
      }, this);

      DiskManager.listen(EVT_LOAD_ERROR, function() {
        this.toast('加载失败', false, 3000);
      }, this);

      DiskManager.listen(EVT_CREATED, this.onModified, this);
      DiskManager.listen(EVT_SAVED, this.onModified, this);
      DiskManager.listen(EVT_DELETED, this.onDeleted, this);

      this.loadList();
      this.initEvt();
      return this;
    },
    initEvt: function() {
      var self = this;

      this.m$content.delegate('ul.selectable li', 'click', function(e) {
        $(this).toggleClass('selected');
      }).on('click', '.add-flash', function(e) {
        e.preventDefault();
        self.m$newFlash.show();
      }).on('submit', '.new-flash form', function(e) {
        e.preventDefault();
        //stupid
        var newFlashObject = {
          id: Date.now(),
          title: $('#newflash-title').val(),
          backgroundColor: $('#newflash-bgcolor').val(),
          flashLoading: $('#newflash-flashLoading').prop('checked'),
          bigFlash: $('#newflash-bigFlash').prop('checked'),
          navbar: $('#newflash-navbar').prop('checked'),
          flashUrl: $('#newflash-flashUrl').val()
        };

        console.log(newFlashObject);

        flashes.push(newFlashObject);

        self.m$newFlash.find('input').empty();

        $('<li/>').attr('data-id', newFlashObject.id).text(newFlashObject.title).appendTo(self.m$flashList);

        self.slideUpNewFlash();
      }).on('click', 'button.cancel', function(e) {
        e.preventDefault();
        self.slideUpNewFlash();
      });

      this.m$generateBtn.click(function(e) {
        var selectedDialogs = self.m$dialogList.find('li.selected');
        //var selectedFlashes = self.m$flashList.find('li.selected');
        //if(!(selectedDialogs.length*selectedFlashes.length))return;

        var dialogIds = Array.prototype.slice.call(selectedDialogs).map(function(item) {
          return $(item).attr('data-id');
        });

        //批量加载N个
        DiskManager.load(dialogIds.join(','), true, function(err, contents) {
          //todo
          if (err) {
            return self.toast(err);
          }
          if (!Array.isArray(contents)) {
            contents = [contents];
          }

          var pages = contents.map(function(conf) {
            var codes = Editor.getCodeFromConf(conf.elements);
            //codes 
            var canvasHTML = Canvas.getCanvasHTML(conf.setting);
            var task = {
              css: codes.styleText,
              html: canvasHTML + codes.innerHtml + '</div></div>'
            };
            return $.extend(task, conf.setting);

          });

          $.ajax({
            url: '/release',
            type: 'post',
            data: {
              pages: pages
            },
            dataType: 'json'
          }).done(function(data) {
            if(0!==+data.status){
              return self.toast(data.msg);
            }
            if(Array.isArray(data.urls)){
              data.urls.forEach(function(item){
                $('<li><a href="'+item+'" target="_blank">'+item+'</a></li>').appendTo(self.m$onlineList);
              });
            }
          }).fail(function(){
            self.toast('生成失败');
          });

        });
        //console.log(dialogIds);

      });
      return self;
    },
    /**
     * [loadList description]
     * @return {[type]} [description]
     */
    loadList: function() {
      DiskManager.list();
      return this;
    },
    onDeleted: function(evt, evtObj, args) {
      this.loadList();
    },
    onModified: function(evt, evtObj, args) {
      this.loadList();
    },
    onListLoaded: function(evt, evtObj, args) {
      var self = this,
        listArr = args[0];
      self.m$dialogList.empty();
      listArr && listArr.forEach(function(item, index) {
        var id = item[0].replace(/\.json$/, '');
        self.m$dialogList.append('<li data-id="' + id + '" title="' + id + '">' + (1 + index) + '.' + item[1] + '[' + Utils.formatDate(new Date(+id)) + ']</li>');
      });
      return this;
    },
    slideUpNewFlash: function() {
      this.m$newFlash.hide();
    }
  });



  return HtmlDialog.init();
});