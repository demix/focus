/**
 * setting.js
 *
 * changelog
 * 2014-03-18[10:12:11]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['local', 'listener'], function(LocalCache, Listener) {
  var KEY_SETTING = 'key-setting';
  var Setting = {
    showFocusElement: true,
    dialogWidth: '404px',
    dialogHeight: '455px',
    dialogBgColor: '',
    dialogTop:'',
    landingPageUrl: 'http://wan.sogou.com/nav.do?fl=sxd_fl_18&fid=100&tf=0&ab=0&source=0001000100002&gid=2&sid=40&pid=1663732439',
    dialogBgImg: 'http://img.wan.sogou.com/ufo/img/newnav/dialog3/ybg2.png',
    dialogVerticalCenter: true,
    init: function() {
      this.listen('settingchanged', this.onSettingChanged, this);
      return this;
    },
    set: function(key, value) {
      if (undefined === this[key] || undefined === value || !key) {
        return;
      }
      var oldVal = this[key];
      if (oldVal == value) return;
      this[key] = value;
      this.trigger('settingchanged', {
        key: key,
        oldVal: oldVal,
        newVal: value
      });
    },
    onSettingChanged: function(evt, evtObj, args) {
      //save to local
      var updating = {};
      updating[args[0].key] = args[0].newVal;
      LocalCache.update(KEY_SETTING, updating);
    }
  };
  $.extend(Setting, new Listener());
  $.extend(Setting, LocalCache.load(KEY_SETTING, {}));
  return Setting.init();
});