/**
 * mark-time.js
 *
 * changelog
 * 2014-03-09[16:00:50]:created
 *
 * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
(function() {
    var global=this;
    var weekCn = '日一二三四五六'.split('');
        function w(n){
                return (n<10)?('0'+n):n;
        }
        function d() {
            var d = new Date();
            global.postMessage((1+d.getMonth() )+ '月' + d.getDate() + '日' + ' 周' + weekCn[d.getDay()] + ' ' + w(d.getHours()) + ':' + w(d.getMinutes()) + ':' + w(d.getSeconds()));
        }
    if (global.postMessage)
        setInterval(d, 1000);
})();