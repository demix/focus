/**
 * release.js
 *
 * changelog
 * 2014-03-27[16:26:13]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.164.209,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['editor', 'canvas', 'setting'], function(Editor, Canvas, Setting) {

    var $form = $('<form/>', {
        target: "_blank",
        "method": "post",
        action: "/release",
        'style':'display:none'
    }).appendTo($(document.body));

    return function() {
        var code = Editor.generateCode();
        var payload = {
            css: code.styleText,
            html: Canvas.getCanvasHTML() + code.innerHtml + "</div>"
        };

        $.extend(payload, Setting.toJSON());
        console.debug(payload);

        $form.empty().append($('<textarea name="config"></textarea>').val(JSON.stringify(payload)));

        $form.submit();

    };
});