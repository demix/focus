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
define(['dialog', 'setting', 'text!tpl/setting.html', 'Ursa','yy.editable'], function(Dialog, Setting, Tpl_Setting) {
  var settingDialog = new Dialog('#dialog-setting', {
    minHeight: 420,
    minWidth: 700
  });


  $.extend(settingDialog, {
    init: function() {
      this.render();
      this.initEvt();
      Setting.listen('loaded', this.onSettingLoaded, this);
      return this;
    },
    initEvt: function() {

      var self =this;

      this.m$content.delegate('input,select', 'change', function(e) {
        var ret;
        if ($(e.target).is(':checkbox')) {
          ret = Setting.set(e.target.name, $(e.target).prop('checked'));
        } else if ($(e.target).is(':radio')) {
          ret = Setting.set(e.target.name, $('[name=' + e.target.name + ']').val());
        } else {
          ret = Setting.set(e.target.name, $(e.target).val());
        }
        if (!ret) {
          e.preventDefault();
        }
      });

      this.m$content.delegate('button.add','click',function(e){
        var $li =$('<tr class="item">\
          <td><span class="href">http://</span></td>\
          <td><span class="textColor">#ff7200</span></td>\
          <td><span class="title">搜狗游戏</span></td>\
           <td class="x"><a href="javascript:;">移除</a></td>\
          </tr>');
        $li.find('.href,.textColor,.title').yeditable();
        self.m$content.find('.linklist').append($li);
      });
      this.m$content.delegate('.x a','click',function(e){
        $(e.target).parents('tr').remove();
      });
      //
      this.m$content.delegate('button.save','click',function(e){
        var ret=[];
        $.each(self.m$content.find('.linklist tr.item'),function(index,tr){
          var $tr=$(tr);
          ret.push({
            href:$tr.find('.href').text(),
            textColor:$tr.find('.textColor').text(),
            title:$tr.find('.title').text()
          });

        });
          Setting.set('navLinks',ret);
      });
    },
    render: function() {
      this.m$content.html(Ursa.render('Tpl_Setting', {setting:Setting.toJSON()}, Tpl_Setting)).find('.href,.textColor,.title').yeditable();
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