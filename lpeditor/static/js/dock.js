/**
 * dock.js
 *
 * changelog
 * 2014-03-07[12:15:10]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['dialog-tree', 'dialog-about', 'dialog-help', 'dialog-setting', 'background'], function(DialogTree, DialogAbout, DialogHelp, DialogSetting, Background) {
  var Dock = {
    /**
     * [init description]
     * @return {[type]} [description]
     */
    init: function() {
      this.m$dock = $('.dock');
      this.m$dockItems = this.m$dock.find('.dock-item');
      this.initEvent();
      return this;
    },
    /**
     * [initEvent description]
     * @return {[type]} [description]
     */
    initEvent: function() {
      var self = this;
      self.m$dockItems.mousedown(
        function() {
          $(this).find('img').stop().animate({
            zoom: 1.3
          }, 100);
        }).mouseup(function() {
        $(this).find('img').stop().animate({
          zoom: 1
        }, 100);
      }).click(function(e) {
        var $self = $(this);

        switch ($self.attr('data-action')) {
          case 'structure':
            DialogTree.toggle();
            break;
          case 'about':
            DialogAbout.toggle();
            break;
          case 'help':
            DialogHelp.toggle();
            break;
          case 'setting':
            DialogSetting.toggle();
            break;
          case 'fullscreen':
            var func = document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen || document.body.requestFullScreen;
            if (document.webkitFullscreenEnabled || document.mozFullscreenEnabled || document.fullscreenEnabled) {
              func && func.call(document.querySelector('.editor-content'));
              setTimeout(function() {
                Background.reload();
              }, 3000);
            } else {
              alert('你的浏览器不支持全屏模式');
            }
            break;
        }
      });
    },
    /**
     * [show description]
     * @return {[type]} [description]
     */
    show: function() {
      var self = this;
      self.m$dock.show().stop().animate({
        width: 800
      }, 'fast', function() {
        self.m$dockItems.show();
      });
    },
    /**
     * [hide description]
     * @return {[type]} [description]
     */
    hide: function() {
      var self = this;
      self.m$dock.stop().animate({
        width: 0
      }, 'fast', function() {
        self.m$dock.hide();
        self.m$dockItems.hide();
      });
    }
  };
  return Dock.init();;
});