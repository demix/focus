/**
 * dialog-setting.js
 *
 * changelog
 * 2014-03-08[16:24:15]:created
 *
 * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['dialog', 'setting', 'text!tpl/setting.html'], function(Dialog, Setting, Tpl_Setting) {
  var settingDialog = new Dialog('#dialog-setting', {
    minHeight: 420,
    minWidth: 700
  });
  settingDialog.m$content.html(Ursa.render('Tpl_Setting', Setting, Tpl_Setting));

  $.extend(settingDialog, {
    init: function() {
      this.render();
      this.initEvt();
      Setting.listen('loaded', this.onSettingLoaded, this);
      return this;
    },
    initEvt: function() {
      this.m$content.delegate('input,select', 'change', function(e) {
        if ($(e.target).is(':radio,:checkbox')) {
          Setting.set(e.target.name, $(e.target).prop('checked'));
        } else {
          Setting.set(e.target.name, $(e.target).val());
        }
      });
    },
    render: function() {
      this.m$content.html(Ursa.render('Tpl_Setting', Setting, Tpl_Setting));
    },
    /**
     * [onSettingLoaded description]
     * @param  {[type]} evt    [description]
     * @param  {[type]} evtObj [description]
     * @param  {[type]} args   [description]
     */
    onSettingLoaded: function(evt, evtObj, args) {
      this.render();
    }
  });

  return settingDialog.init();
});