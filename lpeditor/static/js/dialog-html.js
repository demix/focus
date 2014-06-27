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

  var gFlashes = [];

  $.extend(HtmlDialog, {
    __mCreating:false,
    init: function() {

      this.m$newFlash = this.m$content.find('.new-flash');
      this.m$dialogList = this.m$content.find('.dialog-list');
      this.m$flashList = this.m$content.find('.flash-list');
      this.m$onlineList = this.m$content.find('.online-list');
      this.m$generateBtn = this.m$content.find('button.generate');
      this.m$generateTip = this.m$content.find('.generate-tip');

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
      }).on('click', '.del-online', function(e) {
        e.preventDefault();
        self.m$onlineList.empty();
      }).on('click', '.del-flash', function(e) {
        e.preventDefault();
        var selectedFlashes = self.m$flashList.find('li.selected');
        var deletingIds = Array.prototype.slice.call(selectedFlashes).map(function(item) {
          return +$(item).attr('data-id');
        });

        gFlashes = gFlashes.filter(function(flash){
          return !~deletingIds.indexOf(flash._id);
        });

        selectedFlashes.remove();

      }).on('submit', '.new-flash form', function(e) {
        e.preventDefault();
        //stupid,ugliy
        var newFlashObject = {
          _id: Date.now(), //This is for finding
          payload: {
            title: $('#newflash-title').val(),
            backgroundColor: $('#newflash-bgcolor').val(),
            flashLoading: $('#newflash-flashLoading').prop('checked'),
            bigFlash: !!+$('input[name="newflash-bigFlash"]:checked').val(),
            navbar: $('#newflash-navbar').prop('checked'),
            flashUrl: $('#newflash-flashUrl').val()
          },
          lpid:$('#newflash-id').val(),
          lpname:$('#newflash-name').val()
        };

        newFlashObject.payload.fwidth = (newFlashObject.payload.bigFlash?1400:1000);
        newFlashObject.payload.fheight = (newFlashObject.payload.bigFlash?700:600);

        gFlashes.push(newFlashObject);

        //JQuery has not reset on form element
        self.m$newFlash.find('form')[0].reset();

        $('<li/>').attr('data-id', newFlashObject._id).text(newFlashObject.lpname).appendTo(self.m$flashList);

        self.slideUpNewFlash();

      }).on('click', 'button.cancel', function(e) {
        e.preventDefault();
        self.slideUpNewFlash();
      });

      this.m$generateBtn.click(function(e) {
        var selectedDialogs = self.m$dialogList.find('li.selected');
        var selectedFlashes = self.m$flashList.find('li.selected');
        if(!(selectedDialogs.length*selectedFlashes.length))
        {
          return self.toast('必须至少选择一个对话框和一个Flash');
        }

        var dialogIds = Array.prototype.slice.call(selectedDialogs).map(function(item) {
          return $(item).attr('data-id');
        });

        var FlashIds = Array.prototype.slice.call(selectedFlashes).map(function(item) {
          return +$(item).attr('data-id');
        });

        var flashes = gFlashes.filter(function(flash){
          return ~FlashIds.indexOf(flash._id);
        });


        //This should return true
        if(flashes.length!==FlashIds.length){
          return self.toast('内存泄漏了～');
        }

        selectedDialogs.removeClass('selected');
        selectedFlashes.removeClass('selected');

        //批量加载N个
        DiskManager.load(dialogIds.join(','), true, function(err, contents) {
          //todo
          if (err) {
            return self.toast(err.message);
          }
          if (!Array.isArray(contents)) {
            contents = [contents];
          }

          var pages = [],conf,codes,canvasHTML;

          contents.forEach(function(conf) {
            codes = Editor.getCodeFromConf(conf.elements);
            //codes 
            canvasHTML = Canvas.getCanvasHTML(conf.setting);
            flashes.forEach(function(flash){
              pages.push($.extend( {
              lpid:flash.lpid,
              lpname:flash.lpname,
              css: codes.styleText,
              html: canvasHTML + codes.innerHtml + '</div></div>'
            },conf.setting,flash.payload));
            });

          });

          $.ajax({
            url: '/release',
            type: 'post',
            data: {
              pages: JSON.stringify(pages)
            },
            dataType: 'json',
            beforeSend:function(){
              if(self.__mCreating){
                return false;
              }

              self.m$generateTip.text('正在生成'+pages.length+'个页面...');
              self.__mCreating = true;
            },
            complete:function(){
              self.m$generateTip.empty();
              self.__mCreating = false;
            }
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