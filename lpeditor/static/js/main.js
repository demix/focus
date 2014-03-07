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
    map:{
        '*':{
            'jquery-ui':'jquery-ui-1.10.4.custom.min',
            'jquery-ztree':'jquery.ztree.core-3.5.min'
        }
    }
});
require(['TestCase','system'], function(TestCase,System) {

   // TestCase.run();
    System.startup();
});