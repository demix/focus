<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="pragma" content="no-cache" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="yinyong@sogou-inc.com"/>
        <meta name="follow" content="no"/>
        <title>Landing Page Dialog Editor Studio</title>
        <link rel="stylesheet" type="text/css" href="static/css/main.css" />
        <link rel="stylesheet" type="text/css" href="static/css/jquery-ui-1.10.4.custom.min.css" />
        <link rel="stylesheet" type="text/css" href="static/css/zTreeStyle.css" />
        <link rel="stylesheet" type="text/css" href="static/css/spectrum.css" />
        <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.min.js"></script>
        <script data-main="static/js/main" src="static/js/require.js"></script>
    </head>
    <body onbeforeunload="return '不要忘记同步到服务器';">
    
    <div class="emu-bar" style="background: url(http://s3.wan.sogou.com/cdn/image/2014/02/18/20140218163552_499.png) repeat-x;height:41px;z-index: 10000;width: 100%;"></div>
    <div id="flashbg"></div>

        <div class="w-fil h-fil editor-content">
            <div class="topbar" unselectable="on">
                <div class="menu h-fil fl cf">
                    <span class="appname fl h-fil item" title="LP Page Dialog Editor Studio">LPDES</span>
                </div>
                <div class="mark h-fil fr cf"></div>
            </div>
         <div class="home"></div>
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
                <div class="bar">
                    <span class="name">元素结构</span>
                    <div class="closer" title="关闭"></div>
                     <button class="delete">删除选中元素</button>
                </div>
                <div id="tree-structure" class="content ztree"></div>
            </div>
            <!--SETTING Dialog-->
            <div class="dialog" id="dialog-setting">
                <div class="bar"><span class="name">系统设置</span><div class="closer" title="关闭"></div></div>
                <div class="content"></div>
            </div>
            <!--HELP Dialog-->
            <div class="dialog" id="dialog-help">
                <div class="bar"><span class="name">帮助</span><div class="closer" title="关闭"></div></div>
                <div class="content"></div>
            </div>
            <!--PROP Dialog-->
            <div class="dialog" id="dialog-prop">
                <div class="bar"><span class="name">属性</span><div class="closer" title="关闭"></div></div>
                <div class="content"></div>
            </div>
            <!--DRAFT Dialog-->
            <div class="dialog" id="dialog-draft">
                <div class="bar"><span class="name">草稿</span><div class="closer" title="关闭"></div></div>
                <div class="content"></div>
            </div>
            <!--NEW Dialog-->
            <div class="dialog" id="dialog-new">
                <div class="bar"><span class="name">创建新元素</span><div class="closer" title="关闭"></div></div>
                <div class="content">
                    <form action="/" id="from-create-element" onsubmit="return false;">
                        <fieldset>
                            <div class="row">
                                <label for="_id" class="tit">ID：</label><input type="text" id="_id" name="_id" required="required" placeholder="字母开头的字母、数字、连字符与下划线的组合" style="width:300px"/>
                            </div>
                            <div class="row">
                                <label class="tit">类型：</label>
                                <input type="radio" name="_type" id="_type_img" checked="checked"/>
                                <label for="_type_img">图片</label>
                                <input type="radio" name="_type" id="_type_text"/>
                                <label for="_type_text">文本</label>
                                <input type="radio" name="_type" id="_type_link"/>
                                <label for="_type_link'">链接</label>
                            </div>
                            <div class="row"><label class="tit"></label><button type="submit">创建</button></div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <!--TOOLS Dialog-->
            <div class="dialog" id="dialog-tools">
                <div class="bar">
                    <span class="name">工具</span>
                    <div class="closer" title="关闭"></div>
                    <button class="showall">全部显示</button>
                </div>
                <div class="content"></div>
            </div>
            <!--DISK Dialog-->
            <div class="dialog" id="dialog-disk">
                <div class="bar"><span class="name">服务器档案列表</span><div class="closer" title="关闭"></div></div>
                <div class="content">
                </div>
            </div>
            <!--PUBLISH Dialog-->
            <div class="dialog" id="dialog-publish">
                <div class="bar"><span class="name">发布到线上</span><div class="closer" title="关闭"></div></div>
                <div class="content">
                    <form action="http://10.11.201.199/api/landpageHtml.do" method="post" target="_blank">
                         <fieldset>
                    <div class="row">
                        <label class="tit">lpageFl</label>
                        <input type="text" name="lpageFl" required="required" autocomplete="off" style="width:30em" value="chan" placeholder="一般为swf文件的名字，不可重复"/>
                    </div>
                    <div class="row">
                        <label class="tit">lpageUrl</label>
                        <input type="text" name="vlpageUrl" required="required" autocomplete="off" style="width:30em" placeholder="生成的线上地址，无需修改"/>
                        <input type="hidden" name="lpageUrl"/>
                    </div>
                    <div class="row">
                        <label class="tit">lpageName</label>
                        <input type="text" name="lpageName" required="required" autocomplete="off" style="width:30em" placeholder="随便起名字"/>
                    </div>
                   <div class="row"><label class="tit"></label> <button type="submit">发布</button></div>
                     </fieldset>
                    </form>
                </div>
            </div>
            <!--SAVE Dialog-->
            <div class="dialog" id="dialog-save">
                <div class="bar"><span class="name">存储档案到服务器</span><div class="closer" title="关闭"></div></div>
                <div class="content">
                    <form action="/" onsubmit="return false;">
                        <fieldset>
                            <div class="row">
                                <label for="profile-id" class="tit">ID：</label>
                                <input type="text" value="" readonly="readonly" id="profile-id" placeholder="新建为空"/>
                            </div>
                            <div class="row">
                                <label for="profile-id" class="tit">备注：</label>
                                <input type="text" value="" id="profile-desc" max-length="50" placeholder="档案描述"/>
                            </div><div class="row">
                                <label for="profile-id" class="tit">线上地址：</label>
                                <a href="#" target="_blank" id="onlineUrl"></a>
                            </div>
                            <div class="row">
                                <label for="profile-init" class="tit">另存为：</label>
                                <input type="checkbox" id="profile-init"/>
                            </div>
                            <div class="row"><label class="tit"></label>  <button type="submit">保存到服务器</button></div>
                            
                        </fieldset>
                    </form>
                </div>
            </div>
            <!--ABOUT Dialog-->
            <div class="dialog" id="dialog-about">
                <div class="bar"><span class="name">关于</span><div class="closer" title="关闭"></div></div>
                <div class="content">
                    <img src="/static/img/ufologo-dark.png" class="bl hc"/>
                    <h6 class="tc"><span class="appname">LP Dialog Editor Studio</span> (0.1&alpha;)</h6>
                    <p>仅用于<a href="http://wan.sogou.com" target="_blank">游戏</a>部编辑 <q cite="http://baike.baidu.com/view/3144149.htm">Landing Page</q>  登录注册对话框的样式。承诺持续针对最新版<a href="http://www.google.cn/intl/zh-CN/chrome/browser/" target="_blank">Chrome</a>的全部支持，以及对最新版<a href="http://www.firefox.com.cn/" target="_blank">Firefox</a>、<a href="http://www.opera.com/zh-cn" target="_blank">Opera</a>和Safari(Mac)的部分支持。</p>
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
</html>