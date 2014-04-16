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
define(['editor', 'canvas', 'setting','disk','dialog-save','utils'], function(Editor, Canvas, Setting,DiskManager,SaveDialog,Utils) {

 /*   var $form = $('<form/>', {
        target: "_blank",
        "method": "post",
        action: "/release",
        'style':'display:none'
    }).appendTo($(document.body));*/

    
    
    return function(publish) {
        var id=DiskManager.getProfileId();
        if(!id){
            return  SaveDialog.show().tryTop().title('请先同步到服务器');
        }

        var code = Editor.generateCode();
        var payload = {
            id:id,
            css: code.styleText,
            html: Canvas.getCanvasHTML() + code.innerHtml + "</div></div>"
        };

        $.extend(payload, Setting.toJSON());

        $.ajax({
            url:'/release',
            type:'post',
            data:{
                publish:!!publish,
                config:JSON.stringify(payload)
            },
            dataType:'json'
        }).done(function(data){
            if(!+data.status){
                Utils.popwin('/static/profile/'+data.id+'.html');
            }else{
                console.error(data);
                alert('失败')
            }
        }).fail(function(jqXHR,status){
            console.error(arguments);
            alert(status);
        });

        //$form.empty().append($('<textarea name="config"></textarea>').val(JSON.stringify(payload)));

        //$form.submit();

    };
});