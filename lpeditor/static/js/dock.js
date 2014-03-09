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
define(['dialog-tree', 'dialog-about', 'dialog-help', 'dialog-setting', 'background', 'jquery-fisheye'], function(DialogTree, DialogAbout, DialogHelp, DialogSetting, Background) {
  var Dock = {
    /**
     * [init description]
     * @return {[type]} [description]
     */
    init: function() {
      this.m$dock = $('.dock');
      var dc = this.m$dockContainer = this.m$dock.find('.dock-container');
      var nodes = [{
        icon: 'finder',
        title: '结构',
        action: 'structure'
      }, {
        icon: 'launchpad',
        title: '属性',
        action: 'property'
      }, {
        icon: 'missioncontrol',
        title: '新增',
        action: 'new'
      }, {
        icon: 'systemsettings',
        title: '设置',
        action: 'setting'
      }, {
        icon: 'fullscreen',
        title: '全屏',
        action: 'fullscreen'
      }, {
        icon: 'help-browser',
        title: '帮助',
        action: 'help'
      }, {
        icon: 'system-about',
        title: '关于',
        action: 'about'
      }];

      $.each(nodes, function(index, node) {
        dc.append($("<a/>", {
          'class': 'dock-item',
          'data-action': node.action,
          href: 'javascript:;'
        }).append($('<div/>', {
          'class': 'tit'
        }).append($('<span/>', {
          'class': 'tri'
        })).append(node.title)).append($('<img/>', {
          src: '/static/img/' + node.icon + ".png"
        })));
      });
      this.m$dock.Fisheye({
        maxWidth: 75,
        items: 'a',
        itemsText: '.tit',
        container: '.dock-container',
        itemWidth: 64,
        proximity: 50,
        alignment: 'left',
        valign: 'bottom',
        halign: 'center'
      });
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
      self.m$dockItems.click(function(e) {
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
            var request = document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen || document.body.requestFullScreen;
            var cancel = document.webkitCancelFullScreen || document.mozCancelFullScreen || document.cancelFullScreen;
            if (document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.fullscreenEnabled) {
              if (document.webkitIsFullScreen || document.mozIsFullScreen || document.isFullScreen) {
                cancel.call(document);
              } else {
                request && request.call(document.querySelector('.editor-content'), Element.ALLOW_KEYBOARD_INPUT);
              }
            } else {
              alert('宿主环境不支持全屏模式');
            }
            break;
          default:
            ;
        }
      });
    }
  };
  return Dock.init();;
});