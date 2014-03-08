<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LP Editor</title>
        <link rel="stylesheet" type="text/css" href="static/css/main.css" />
        <link rel="stylesheet" type="text/css" href="static/css/jquery-ui-1.10.4.custom.min.css" />
        <link rel="stylesheet" type="text/css" href="static/css/zTreeStyle.css" />
    </head>
    <body>
        <div class="w-fil h-fil editor-content">
            <iframe src="http://wan.sogou.com/nav.do?fl=sxd_fl_18&fid=100&tf=0&ab=0&source=0001000100002&gid=2&sid=40&pid=1663732439" frameborder="0" class="w-fil h-fil" id="bg_iframe"></iframe>
            <div class="w-fil h-fil ab bench">
                <div class="w-fil h-fil ab bg"></div>
                <div class="canvas">
                </div>
            </div>
            <div class="home"></div>
            <div class="dock">
                <div class="dock-item" data-action="structure">
                    <p class="tit">结构<span class="tri"></span></p>
                    <img src="/static/img/finder.png"/>
                </div>
                <div class="dock-item" data-action="property">
                    <p class="tit">属性<span class="tri"></span></p>
                    <img src="/static/img/launchpad.png"/>
                </div>
                <div class="dock-item" data-action="new">
                    <p class="tit">新增<span class="tri"></span></p>
                    <img src="/static/img/missioncontrol.png"/>
                </div>
                <div class="dock-item" data-action="setting">
                    <p class="tit">设置<span class="tri"></span></p>
                    <img src="/static/img/systemsettings.png"/>
                </div>
                <div class="dock-item" data-action="fullscreen">
                    <p class="tit">全屏<span class="tri"></span></p>
                    <img src="/static/img/fullscreen.png"/>
                </div>
                <div class="dock-item" data-action="help">
                    <p class="tit">帮助<span class="tri"></span></p>
                    <img src="/static/img/help-browser.png"/>
                </div>
                <div class="dock-item" data-action="about">
                    <p class="tit">关于<span class="tri"></span></p>
                    <img src="/static/img/system-about.png"/>
                </div>
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
                    <h6 class="tc"><span class="appname">LP Dialog Editor</span> (1.0 beta)</h6>
                    <p>仅用于搜狗UPD游戏部编辑 <q cite="http://baike.baidu.com/view/3144149.htm">Landing Page</q>  登录注册对话框样式。</p>
                    <p>Copyright &copy; 2014 sogou.com. All Rights Reserved.</p>
                    <p>Bug Report：<a href="mailto:yinyong@sogou-inc.com?cc=zhengxin@sogou.com&subject=LP%20Dialog%20Editor%20Bug%20Report" target="_blank">yinyong@sogou-inc.com</a></p>
                    <p>Contact:<a href="http://wpa.qq.com/msgrd?V=1&Uin=670409732&Site=ioshenmue&Menu=yes" target="_blank" title="启动qq客户端"><img src="/static/img/qq.gif"/></a></p>
                </div>
            </div>

        </div>
       
    </body>
    <script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
    <script data-main="static/js/main" src="static/js/require.js"></script>
</html>