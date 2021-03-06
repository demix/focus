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
        <!-- onbeforeunload="return '不要忘记同步到服务器';"-->
    <body>
    
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
            <!--HTML Dialog-->
            <div class="dialog" id="dialog-html">
                <div class="bar">
                    <span class="name">创建Landing Page</span>
                    <div class="closer" title="关闭"></div>
                </div>
                <div class="re content">
                    <div class="wrapper f-f">
                        <div class="ul-wrapper">
                            <div class="tip">一、选择对话框：</div>
                            <ul class="dialog-list selectable"></ul>
                        </div>
                        <div class="ul-wrapper">
                            <div class="tip">二、新建Flash对象：</div>
                            <ul class="flash-list selectable"></ul>
                            <div class="tool">
                                <a href="#" class="add-flash" title="新增">+</a>
                                <a href="#" class="del-flash" title="移除选中">-</a>
                            </div>
                        </div>
                        <div class="ul-wrapper">
                            <div class="tip">三、生成的线上地址：</div>
                            <ul class="online-list"></ul>
                                <div class="tool">
                                <a href="#" class="del-online" title="清空">-</a>
                            </div>
                        </div>
                    </div>
                    <div class="f-f f-hr">
                        <span class="generate-tip">生成页面速度较慢，请耐心等待，上线有几十秒的延迟</span>
                        <button class="generate">生成</button>
                    </div>
                    <div class="ab new-flash">
                        <p>请输入flash的相关参数</p>
                        <form action="#" autocomplete="off">
                            <div class="f-f">
                                <label for="newflash-id">引导页ID</label>
                                <input type="text" id="newflash-id" required="required" class="" placeholder="请保证系统唯一性"/>
                            </div>
        
                            <div class="f-f">
                            <label for="newflash-name">引导页名称</label>
                                <input type="text" id="newflash-name" required="required" class="" placeholder="LP语义索引"/>
                            </div>
                            
                            <div class="f-f">
                            <label for="newflash-title">引导页标题</label>
                                <input type="text" id="newflash-title" required="required" class="" placeholder="页面标题"/>
                            </div>

                            <div class="f-f">
                            <label for="newflash-bgcolor">引导页背景颜色</label>
                                <input type="text" id="newflash-bgcolor" class="" value="#000"/>
                            </div>

                            <div class="f-f">
                            <label for="newflash-flashLoading">是否用壳子加载素材Flash</label>
                                <input type="checkbox" id="newflash-flashLoading" checked="checked" class=""/>
                            </div>

                            <div class="f-f">
                            <label for="newflash-bigFlash">Flash尺寸</label>
                                <input type="radio" name="newflash-bigFlash" class="" value="0" checked="checked"/> 小 
                                <input type="radio" name="newflash-bigFlash" class="" value="1"/> 大
                            </div>

                            <div class="f-f">
                            <label for="newflash-navbar">显示导航栏</label>
                                <input type="checkbox" id="newflash-navbar" class=""/>
                            </div>

                            <div class="f-f">
                            <label for="newflash-flashUrl">Flash 地址</label>
                                <input type="text" id="newflash-flashUrl" required="required" class="" placeholder="合法的HTTP超链接"/>
                            </div>
                            <div class="f-f f-hr">
                                <button type="button" class="cancel">取消</button>
                                <button type="submit">确定</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!--DISK Dialog-->
            <div class="dialog" id="dialog-disk">
                <div class="bar"><span class="name">服务器档案列表</span><div class="closer" title="关闭"></div></div>
                <div class="content">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>序号.</th>
                                <th>名称</th>
                                <th>日期</th>
                                <th>加载</th>
                                <th>删除</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
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
                                <input type="text" value="" readonly="readonly" id="profile-id" placeholder="系统自动生成"/>
                            </div>
                            <div class="row">
                                <label for="profile-id" class="tit">描述：</label>
                                <input type="text" value="" id="profile-desc" max-length="50" style="width:25em" placeholder="档案描述，用于肉眼识别"/>
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
                    <h6 class="tc"><span class="appname">LP Dialog Editor Studio</span> (0.3&beta;)</h6>
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