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

    var newDialog = new Dialog('#dialog-new');

    $.extend(newDialog, {
        init: function() {
            this.initEvt();
            return this;
        },
        initEvt: function() {
            this.m$content.find('form').submit(function(e) {

                var id = $.trim($('#_id').val());

                switch ($('[name="_type"]:checked').attr('id')) {
                    case '_type_link':
                        var ele = new Element('a', {
                            href: 'http://www.sogou.com',
                            target: '_blank',
                            id: id
                        }, {
                            width: '40px',
                            height: '20px',
                            position: 'absolute',
                            left: '30px',
                            top: '30px',
                            color: '',
                            'font-size': '',
                            'font-family': '',
                            'background-img': '',
                            'background-position': '',
                            'background-repeat': ''
                        }, '链接');
                        try {
                            Editor.addElement(ele);
                        } catch (e) {
                            alert(e.message)
                        }
                        break;
                    case '_type_text':
                        var ele = new Element('div', {
                            id: id
                        }, {
                            width: '40px',
                            height: '20px',
                            position: 'absolute',
                            left: '10px',
                            top: '10px',
                            color: '',
                            'font-size': '',
                            'font-family': '',
                            'background-img': '',
                            'background-position': '',
                            'background-repeat': ''
                        }, '文本');
                        try {
                            Editor.addElement(ele);
                        } catch (e) {
                            alert(e.message)
                        }
                        break;
                    case '_type_img':
                        var ele = new Element('img', {
                            src: "/static/img/sogou.png",
                            id: id
                        }, {
                            width: '256px',
                            height: '256px',
                            left: '20px',
                            position: 'absolute',
                            top: '20px'
                        });
                        try {
                            Editor.addElement(ele);
                        } catch (e) {
                            alert(e.message)
                        }
                        break;
                    default:
                        ;
                }

                e.preventDefault();
            });

            return this;
        }
    })

    return newDialog.init();;
});