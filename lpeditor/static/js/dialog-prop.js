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
define(['dialog', 'editor', 'text!tpl/prop.html','propselector', 'Ursa'], function(Dialog, Editor,Tpl_Prop,PropSelector) {

    var propDialog = new Dialog('#dialog-prop');

    $.extend(propDialog, {
        m$focusElement : null,
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
            var self = this;
            Editor.listen('focuschanged', this.onFocusChanged, this);
            Editor.listen('loaded', this.onEditorLoaded, this);

            this.m$content.delegate('input,select','change',function(e){
                var clazz = e.target.className,tar;
                if(!(tar=self.m$focusElement)){
                    console.log('no focus element');
                    return;
                }
                if ('p' === clazz[0]) {
                    tar.setProps(clazz.split('/')[1],$(e.target).val());
                } else if ('c' === clazz[0]) {
                    tar.setCss(clazz.split('/')[2],$(e.target).val(),clazz.split('/')[1]);
                } else if ('t' === clazz[0]) {
                    tar.setText($(e.target).val());
                }
            });

            return this;
        },
        onEditorLoaded:function(evt,evtObj,args){
            this.m$focusElement=null;
            this.m$content.empty();
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
                    ele: focusEle,
                    propSelector:PropSelector
                }, Tpl_Prop));
                this.title('属性 -- #' + focusEle.getId());
                this.m$focusElement = focusEle;
            }
        }
    });

    return propDialog.init();

});