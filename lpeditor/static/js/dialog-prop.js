/**
 * dialog-prop.js
 *
 * changelog
 * 2014-03-10[10:44:45]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.165.51,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['dialog', 'editor', 'text!tpl/prop.html', 'Ursa'], function(Dialog, Editor, Tpl_Prop) {

    var propDialog = new Dialog('#dialog-prop');

    $.extend(propDialog, {
        /**
         * [init description]
         * @return {[type]}
         */
        init: function() {
            Ursa.compile(Tpl_Prop, 'Tpl_Prop');
            return this.initEvt();
        },
        /**
         * [initEvt description]
         * @return {[type]}
         */
        initEvt: function() {
            Editor.listen('focuschanged', this.onFocusChanged, this);
            return this;
        },
        /**
         * [onFocusChanged description]
         * @param  {[type]} evt
         * @param  {[type]} evtObj
         * @param  {[type]} args
         * @return {[type]}
         */
        onFocusChanged: function(evt, evtObj, args) {
            var focusEle = args[1];
            if (focusEle) {
                this.m$content.html(Ursa.render('Tpl_Prop', {
                    ele: focusEle
                }, Tpl_Prop));
                this.title('属性 -- #' + focusEle.getId());
            }
        }
    });

    return propDialog.init();

});