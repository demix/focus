/**
 * background.js
 *
 * changelog
 * 2014-03-08[01:36:32]:created
 *
 * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['setting'], function(Setting) {
  var Background = {
    /**
     * [init description]
     * @return {[type]} [description]
     */
    init: function() {
      var self = this;
      self.m$flashbg = $('#flashbg');
      self.toggleFlash();
      $('.bench .bg').toggle(Setting.get('mask'));

      document.addEventListener('webkitfullscreenchange', function() {
        setTimeout(function() {
          self.reload()
        }, 3000);
      }, false);
      document.addEventListener('mozfullscreenchange', function() {
        setTimeout(function() {
          self.reload()
        }, 3000);
      }, false);
      document.addEventListener('webkitfullscreenchange', function() {
        setTimeout(function() {
          self.reload()
        }, 3000);
      }, false);

      Setting.listen('settingchanged', this.onSettingChanged, this)
      return self;
    },
    /**
     * [onSettingChanged description]
     * @param  {[type]} evt
     * @param  {[type]} evtObj
     * @param  {[type]} args
     */
    onSettingChanged: function(evt, evtObj, args) {
      var arg = args[0];
      if(!!~"flashUrl,navbar,bigFlash".split(',').indexOf(arg.key)){
         this.toggleFlash();
      }else if('mask' === arg.key){
        $('.bench .bg').toggle(Setting.get('mask'));
      }
    },
    /**
     * [toggleFlash description]
     * @return {[type]} [description]
     */
    toggleFlash: function() {
      var c = 'navSmall,navBig,smallFlash,bigFlash'.split(',');

      var embed = '<embed height="'+(Setting.get('bigFlash') ? 700 : 600)+'" flashvars="" pluginspage="http://www.adobe.com/go/getflashplayer"\
       src="'+Setting.get('flashUrl')+'"\
        type="application/x-shockwave-flash" width="'+(Setting.get('bigFlash') ? 1400 : 1000)+'" wmode="opaque" quality="high" allowscriptaccess="always" id="flash_id">';

      this.m$flashbg.html(embed);

      if (Setting.get('navbar')) {
        $('.emu-bar').show();
        clazz = Setting.get('bigFlash') ? 'navBig' : 'navSmall';
      } else {
        $('.emu-bar').hide();
        clazz = Setting.get('bigFlash') ? 'bigFlash' : 'smallFlash';
      }
      this.m$flashbg.removeClass().addClass(clazz);
      return this;
    },
    /**
     * [reload description]
     * @return {[type]} [description]
     */
    reload: function() {
      this.toggleFlash();
/*      var src = this.m$flashbg.find('embed').attr('src');
       this.m$flashbg.find('embed')[0].src = src;
*/    }
  };
  return Background.init();
});