/**
 * dialog-new.js
 *
 * changelog
 * 2014-03-22[00:04:56]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['dialog', 'element', 'editor'], function(Dialog, Element, Editor) {

    var newDialog = new Dialog('#dialog-new', {
        resizable: false
    });

    $.extend(newDialog, {
        init: function() {
            this.initEvt();
            return this;
        },
        initEvt: function() {
            var self = this;
            self.m$content.find('form').submit(function(e) {

                var id = $.trim($('#_id').val());

                if (!/^[a-zA-Z][\w\-]*$/.test(id)) {
                    return self.toast('id 需要是字母开头的字母、数字、连字符与下划线的组合');
                }

                switch ($('[name="_type"]:checked').attr('id')) {
                    case '_type_link':
                        var ele = new Element('a', {
                            href: 'http://www.sogou.com',
                            target: '_blank',
                            id: id,
                            __ro: ''
                        }, {
                            width: '40px',
                            height: '20px',
                            position: 'absolute',
                            left: '30px',
                            top: '30px',
                            color: '',
                            'font-size': '',
                            'font-family': '',
                            'background-image': '',
                            'background-position': '',
                            'background-repeat': '',
                            'z-index': ''
                        }, '链接');
                        try {
                            Editor.addElement(ele);
                        } catch (e) {
                            self.toast(e.message)
                        }
                        break;
                    case '_type_text':
                        var ele = new Element('div', {
                            id: id,
                            __ro: ''
                        }, {
                            width: '40px',
                            height: '20px',
                            position: 'absolute',
                            left: '10px',
                            top: '10px',
                            color: '',
                            'font-size': '',
                            'font-family': '',
                            'background-image': '',
                            'background-position': '',
                            'background-repeat': '',
                            'z-index': ''
                        }, '文本');
                        try {
                            Editor.addElement(ele);
                        } catch (e) {
                            self.toast(e.message)
                        }
                        break;
                    case '_type_img':
                        var ele = new Element('img', {
                            src: "/static/img/sogou.png",
                            id: id,
                            __ro: ''
                        }, {
                            width: '50px',
                            height: '50px',
                            left: '20px',
                            position: 'absolute',
                            top: '20px',
                            'z-index': ''
                        });
                        try {
                            Editor.addElement(ele);
                        } catch (e) {
                            self.toast(e.message)
                        }
                        break;
                    default:
                        ;
                }

                e.target.reset();
                e.preventDefault();
            });

            return this;
        }
    })

    return newDialog.init();;
});