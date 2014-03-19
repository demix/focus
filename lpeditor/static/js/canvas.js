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
            this.setDialogWidth(Setting.dialogWidth);
            this.setDialogHeight(Setting.dialogHeight);
            this.setDialogBgColor(Setting.dialogBgColor);
            this.setDialogBgImg(Setting.dialogBgImg);
            this.setDialogVerticalCenter(Setting.dialogVerticalCenter);
            Setting.listen('settingchanged', this.onSettingChanged, this);
            return this;
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
                this[func].call(this, args[0].newVal);
            }
        },
        /**
         * [setDialogBgColor description]
         * @param {[type]} color [description]
         */
        setDialogBgColor: function(color) {
            $canvas.css('background-color', color || '');
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
        setDialogTop: function(top) {
            if (!Setting.dialogVerticalCenter) {
                $canvas.css('top', top);
            }
        },
        /**
         * [setDialogWidth description]
         * @param {[type]} width [description]
         */
        setDialogWidth: function(width) {
            $canvas.css('width', width);
        },
        /**
         * [setDialogHeight description]
         * @param {[type]} height [description]
         */
        setDialogHeight: function(height) {
            $canvas.css('height', height);
            if (Setting.dialogVerticalCenter) {
                $canvas.css('margin-top', '-' + $canvas.height() / 2 + 'px');
            }
        },
        /**
         * [setDialogLocation description]
         * @param {[type]} loc [description]
         */
        setDialogVerticalCenter: function(center) {
            if (center) {
                $canvas.css('top', '50%');
                $canvas.css('margin-top', '-' + $canvas.height() / 2 + 'px');
            } else {
                $canvas.css('top', Setting.dialogTop);
                $canvas.css('margin-top', '0');
            }
        },
        getCanvasHTML: function() {
            var css = ['position:relative','margin:0 auto','top:' + $canvas.css('top'), 'margin-top:' + $canvas.css('margin-top'), 'background-image:' + $canvas.css('background-image'),'background-color:'+$canvas.css('background-color'),'width:'+$canvas.css('width'),'height:'+$canvas.css('height')].join(';');
            return '<div style="'+css+'">';
        },
    };



    return Canvas.init();
});