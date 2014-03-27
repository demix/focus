<div class="landing-header" id="Landing_Header" style="background: url(http://s3.wan.sogou.com/cdn/image/2014/02/18/20140218163552_499.png) repeat-x;">
	<ul>
        <!-- 间隔线 宽2px 高28px-->
    	<li class="daohang-line" style="background: url(http://s2.wan.sogou.com/r4/img/landingpage/line.png) no-repeat center right;">
        <!-- 搜狗游戏中心logo:宽120px 高38px-->
        <a href="http://wan.sogou.com/sw-index.html" class="daohang-logo" target="_blank" style="background: url(http://s7.wan.sogou.com/cdn/image/2014/02/18/20140218163323_604.png) no-repeat 0px 4px;"></a>
        </li>
     <!-- 间隔线 宽2px 高28px-->
    	<li class="daohang-line" style="background: url(http://s2.wan.sogou.com/r4/img/landingpage/line.png) no-repeat center right;">
             <!-- 喇叭形状  宽14px 高14px-->
            <span class="daohang-icon" style="background:url(http://s7.wan.sogou.com/cdn/image/2014/02/18/20140218163323_604.png) no-repeat 0px -38px;"></span>
        </li>
		<li class="gonggao-carousel-wrapper">
            <i class="gg-logo"></i>
            <div class="gonggao-carousel" id="LP_GG">
                <div class="player-main">
                    {% for item in navLinks %}
					<a href="{{item.href}}" target="_blank" style="color: {{item.textColor}};">{{item.title}}</a>
                    {% endfor %}
                </div>
            </div>
        </li>
        <!-- 间隔| 颜色-->
        <li class="link" style="color:#2A2A2A;">
        <!-- 字体颜色-->
        <a href="#" id="Collect_Site" style="color:#000;">收藏本站</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="#" id="First_Page" style="color:#000;">设为首页</a></li>
    </ul>
</div>
