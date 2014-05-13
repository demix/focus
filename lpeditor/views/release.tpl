<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>{{title}}-搜狗游戏</title>
        {% if sys.debug %}
        <link rel="stylesheet" href="{{sys.cssurl}}" />
        {% else %}
        <style>
        {{ sys.css|raw }}
        </style>
        {% endif %}
        {% if navbar %}
        {% if sys.debug %}
        <link rel="stylesheet" href="{{sys.navcssurl}}" />
        {% else %}
        <style>
        {{ sys.navcss|raw }}
        </style>
        {% endif %}
        {% endif %}

        <style>
         {{css|raw}}
         body{background:{{backgroundColor}};}
        </style>
        

        <script>
         {{sys.pbjs|raw}}
        </script>
    </head>
    <body {%if twoInOne%}data-type="1"{%endif%}>
        <!-- flash -->
        <div id="Flash_Wrp" class="flash-wrp flash-{%if navbar%}nav{%else%}unnav{%endif%}-{{fwidth}}">
		    <script>
                {% if flashLoading %}
                {{ sys.flashloadingjs|raw }}
                {% else %}
                {{ sys.flashjs|raw }}
                {% endif %}
		    </script>
            
        </div>
        <!-- flash end -->
        <!-- nav bar -->
        {% if navbar %}
        {% include './nav_header.tpl' %}
        {% endif %}
        <!-- nav bar end -->
        
        {% if mask %}
        <div id="Mask" class="mask" style="display:none;"></div>
        {% endif %}

        {{html|raw}}
    </body>
    <!--[if IE 6]>
        <script src="http://img.wan.sogou.com/ufo/helper/DD_belatedPNG.js"></script><script>DD_belatedPNG.fix('.daohang-logo, .daohang-icon');</script>
        <![endif]-->

    {% if sys.debug %}
    <script src="{{sys.jsurl}}"></script>
    {% else %}
    <script>
     {{ sys.js|raw }}
    </script>
    {% endif %}
    {% if navbar %}
    {% if sys.debug %}
    <script src="{{sys.navjsurl}}"></script>
    {% else %}
    <script>
     {{ sys.navjs|raw }}
    </script>
    {% endif %}
    {% endif %}
    <script>
     {% if showDialog %}
     utils.pb.cl( utils.merge( utils.clone(STATS_CONFIG),{module:'autoshow'}));
     showreg();

     {% endif %}
    </script>
</html>

