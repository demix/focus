/**
 * dialog-about.js
 *
 * changelog
 * 2014-03-08[15:03:08]:created
 *
 * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['dialog'], function(Dialog) {
    var aboutDialog = new Dialog('#dialog-about',{
        resizable:false
    });

    return aboutDialog;
});