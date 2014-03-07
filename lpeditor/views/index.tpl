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
                <div class="bar">元素结构<div class="closer" title="关闭">X</div></div>
                <div class="content ztree"></div>
            </div>
        </div>
       
    </body>
    <script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
    <script data-main="static/js/main" src="static/js/require.js"></script>
</html>