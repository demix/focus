/**
 * dialog-help.js
 *
 * changelog
 * 2014-03-08[15:03:20]:created
 *
 * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['dialog','text!tpl/help.html','local'], function(Dialog,Tpl_Help,LocalCache) {

    var KEY_HELP = 'helpshowed';
    var helpDialog = new Dialog('#dialog-help',{
        resizable:false
    });

    helpDialog.m$content.html(Tpl_Help);

    var cache = LocalCache.load(KEY_HELP);
    if(!cache||!cache.showed){
        helpDialog.show();
        LocalCache.update(KEY_HELP,{showed:true});
    }

    return helpDialog;
});