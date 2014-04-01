/**
 * canvas.js
 *
 * changelog
 * 2014-03-18[16:14:19]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['setting'], function(Setting) {
    var $canvas = $('.canvas');

    var Canvas = {
        init: function() {
            this.setDialogWidth(Setting.data.dialogWidth);
            this.setDialogHeight(Setting.data.dialogHeight);
            this.setDialogBgColor(Setting.data.dialogBgColor);
            this.setDialogBgImg(Setting.data.dialogBgImg);
            this.setDialogLeftOffset(Setting.data.dialogLeftOffset);
            this.setDialogVerticalCenter(Setting.data.dialogVerticalCenter);
            Setting.listen('settingchanged', this.onSettingChanged, this);
            return this;
        },
        computePosition:function(){
             if (Setting.get('dialogVerticalCenter')) {
                $canvas.css({'top': '50%','margin-top':'-' + (parseInt(Setting.get('dialogHeight'))|0) / 2 + 'px'});
            } else {
                $canvas.css({'top':Setting.get('dialogTop'),'margin-top':0});
            }

            var w = parseInt(Setting.get('dialogWidth'))||405;
            var offset =parseInt(Setting.get('dialogLeftOffset'))||0;
            $canvas.css({
                'margin-left':'-'+(w/2+offset)+'px'
            });

        },
        /**
         * [onSettingChanged description]
         * @param  {[type]} evt
         * @param  {[type]} evtObj
         * @param  {[type]} args
         * @return {[type]}
         */
        onSettingChanged: function(evt, evtObj, args) {
            if (/^dialog/i.test(args[0].key)) {
                var func = 'set' + args[0].key.replace(/^[a-z]/, function(n) {
                    return String(n).toUpperCase()
                });
                this[func]&&this[func].call(this, args[0].newVal);
            }
        },
        /**
         * [setDialogBgColor description]
         * @param {[type]} color [description]
         */
        setDialogBgColor: function(color) {
            $canvas.css('background-color', color || '');
        },
        setDialogLeftOffset:function(offset){
            this.computePosition();
        },
        /**
         * [setDialogBgImg description]
         * @param {[type]} img [description]
         */
        setDialogBgImg: function(img) {
            if (!/url\(.*?\)/.test(img)) {
                img = 'url(' + img + ')';
            }
            $canvas.css('background-image', img);
        },
        /**
         * [setDialogTop description]
         * @param {[type]} top [description]
         */
        setDialogTop: function(top) {
            if (!Setting.data.dialogVerticalCenter) {
                $canvas.css('top', top);
                this.computePosition();
            }
        },
        /**
         * [setDialogWidth description]
         * @param {[type]} width [description]
         */
        setDialogWidth: function(width) {
            $canvas.css('width', width);
            this.computePosition();
        },
        /**
         * [setDialogHeight description]
         * @param {[type]} height [description]
         */
        setDialogHeight: function(height) {
            $canvas.css('height', height);
            this.computePosition();
        },
        /**
         * [setDialogLocation description]
         * @param {Boolean} center
         */
        setDialogVerticalCenter: function(center) {
            this.computePosition();

        },
        getCanvasHTML: function(preview) {
            var css = [preview ? '' : 'display:none',
             'position:absolute',
              'margin-left:50%',
              'left:-'+($canvas.width()/2)+'px', 
              'top:' + (Setting.get('dialogVerticalCenter')?'50%':Setting.get('dialogTop')),
              'margin-top:' + (Setting.get('dialogVerticalCenter')?('-' + (parseInt(Setting.get('dialogHeight'))|0) / 2 + 'px'):0),
              'width:' + Setting.get('dialogWidth'), 
              'height:' + Setting.get('dialogWidth')].join(';');
            var bgcss = ['position:absolute;left:0;top:0',
            'background-image:url(' +  Setting.get('dialogBgImg')+')', 
            'background-color:' + Setting.get('dialogBgColor'), 
            'width:' + Setting.get('dialogWidth'), 
            'height:' + Setting.get('dialogHeight')].join(';');
            console.debug(css)
            return '<div id="lp-dialog" style="' + css + '"><div class="dialog-bg" id="dialog-bg" style="'+bgcss+'">';
        },
    };



    return Canvas.init();
});