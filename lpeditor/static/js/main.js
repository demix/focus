/**
 * main.js
 *
 * changelog
 * 2014-03-04[18:00:28]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong/lpeditor/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
require.config({
    map: {
        '*': {
            'jquery-ui': 'jquery-ui-1.10.4.custom.min',
            'jquery-ztree': 'jquery.ztree.all-3.5.min',
            'jquery-fisheye':'jquery-fisheye'
        }
    }
});
require(['TestCase', 'checklist', 'ping'], function(TestCase, Checklist, Ping) {

    window.onerror = function(e) {
        Ping.send(e);
    };
 Checklist.start(function(result) {
        if (result) {
            require(['system'], function(System) {
                System.startup()
            });
        }
    });

});