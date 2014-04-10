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
define(['local', 'listener','disk'], function(LocalCache, Listener,DiskManager) {
  var KEY_SETTING = 'key-setting';
  var Setting = {
    data:{
        showFocusElement: true,
        dialogWidth: '404px',
        dialogHeight: '455px',
        dialogBgColor: '',
        dialogTop: '41px',
        dialogLeftOffset:'0px',
        bigFlash:true,
        navbar:true,
        mask:true,
        title:'',
        twoInOne:false,//reg&login
        showDialog:true,
        flashUrl: "http://img.wan.sogou.com/cdn/nav/bg/chan.swf",
        dialogBgImg: 'http://img.wan.sogou.com/ufo/img/newnav/dialog3/ybg2.png',
        dialogVerticalCenter: true,
        navLinks:[],
        fwidth:1400,
        fheight:700
    },
    defaultData:{},
    init: function() {
      $.extend(this.defaultData,this.data);
      Object.freeze(this.defaultData);
      DiskManager.listen(EVT_LOADED, this.onProfileLoaded, this);
      return this;
    },
    /**
     * [set description]
     * @param {[type]} key  
     * @param {[type]} value
     */
    set: function(key, value) {
      if (/*undefined === this.data[key] || */undefined === value || !key) {
        return false;
      }

      if('dialogBgImg' ===key&&!value){
        return false;
      }
      if('bigFlash'===key){
        this.data['fwidth']=(value?1400:1000);
        this.data['fheight']=(value?700:600);
      }

      var oldVal = this.data[key];
      if (oldVal == value) return;
      this.data[key] = value;
      this.trigger('settingchanged', {
        key: key,
        oldVal: oldVal,
        newVal: value
      });

      return true;
    },
    /**
     * [onProfileLoaded description]
     * @param  {[type]} evt   
     * @param  {[type]} evtObj
     * @param  {[type]} args  
     */
    onProfileLoaded:function(evt, evtObj, args){
        var profile = args&&args[0];
        profile&&profile.setting&&this.load(profile.setting);
    },
    /**
     * [load description]
     * @param  {[type]} settings
     * @return {[type]}         
     */
    load:function(settings){
      var self = this;

      /*self.data={};

      $.extend(self.data,self.defaultData);*/

      $.each(settings,function(key,val){
        self.set(key,val);
      });

      this.trigger('loaded');

      return this;
    },
    /**
     * [toJSON description]
     * @return {Plain Object}
     */
    toJSON: function() {
      return this.data;
    },
    /**
     * [get description]
     * @param  {[type]} name [description]
     */
    get:function(name){
      return this.data[name];
    }
  };

  $.extend(Setting, new Listener());
  return Setting.init();
});