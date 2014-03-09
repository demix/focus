<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="pragma" content="no-cache" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="yinyong@sogou-inc.com"/>
        <meta name="follow" content="no"/>
        <title>Landing Page Dialog Editor Studio ------ wan.sogou.com</title>
        <link rel="stylesheet" type="text/css" href="static/css/main.css" />
        <link rel="stylesheet" type="text/css" href="static/css/jquery-ui-1.10.4.custom.min.css" />
        <link rel="stylesheet" type="text/css" href="static/css/zTreeStyle.css" />
    </head>
    <body>
        <div class="w-fil h-fil editor-content">
            <div class="topbar" unselectable="on"><div class="mark h-fil fr cf"></div></div>
            <iframe src="about:blank" frameborder="0" class="w-fil h-fil" id="bg_iframe"></iframe>
            <div class="w-fil h-fil ab bench">
                <div class="w-fil h-fil ab bg"></div>
                <div class="canvas">
                </div>
            </div>
            <div class="dock">
                <div class="dock-container"></div>
            </div>
            <style id="previewStyle" type="text/css"></style>
            <!--TREE Dialog-->
            <div class="dialog" id="dialog-tree">
                <div class="bar">元素结构<div class="closer" title="关闭"></div></div>
                <div class="content ztree"></div>
            </div>
            <!--SETTING Dialog-->
            <div class="dialog" id="dialog-setting">
                <div class="bar">设置<div class="closer" title="关闭"></div></div>
                <div class="content">
                    <p>Coming soon...</p>
                </div>
            </div>
            <!--HELP Dialog-->
            <div class="dialog" id="dialog-help">
                <div class="bar">帮助<div class="closer" title="关闭"></div></div>
                <div class="content">
                    <p>Coming soon...</p>
                </div>
            </div>
            <!--ABOUT Dialog-->
            <div class="dialog" id="dialog-about">
                <div class="bar">关于<div class="closer" title="关闭"></div></div>
                <div class="content">
                    <img src="/static/img/ufologo-dark.png" class="bl hc"/>
                    <h6 class="tc"><span class="appname">LP Dialog Editor</span> (0.1&alpha;)</h6>
                    <p>仅用于<a href="http://wan.sogou.com" target="_blank">游戏</a>部编辑 <q cite="http://baike.baidu.com/view/3144149.htm">Landing Page</q>  登录注册对话框的样式。承诺持续针对最新版<a href="http://www.google.cn/intl/zh-CN/chrome/browser/" target="_blank">Chrome</a>的全部支持，以及对最新版<a href="http://www.firefox.com.cn/" target="_blank">Firefox</a>、<a href="http://www.opera.com/zh-cn" target="_blank">Opera</a>和Safari(Mac)的部分支持。Internet Explorer及其它第三方浏览器不会得到针对性支持。</p>
                    <p>Copyright &copy; 2014 sogou.com. All Rights Reserved.</p>
                    <p>Bug Report：<a href="mailto:yinyong@sogou-inc.com?cc=zhengxin@sogou.com&subject=LP%20Dialog%20Editor%20Bug%20Report" target="_blank">yinyong@sogou-inc.com</a></p>
                    <p>Contact：<a href="http://wpa.qq.com/msgrd?V=1&Uin=670409732&Site=ioshenmue&Menu=yes" target="_blank" title="启动qq客户端"><img src="/static/img/qq.gif"/></a></p>
                </div>
            </div>
            <div class="startup w-fil h-fil">
                <ul class="list" unselectable="on"></ul>
                <div class="login"><div class="icon"></div><div class="starting">正在启动</div></div>
            </div>
        </div><!--end editor-content-->
       
    </body>
    <script src="http://lib.sinaapp.com/js/jquery/1.10.2/jquery-1.10.2.min.js"></script>
    <script data-main="static/js/main" src="static/js/require.js"></script>
</html>