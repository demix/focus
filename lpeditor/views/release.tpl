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
        </style>
    </head>
    <body>
        <!-- flash -->
        <div id="Flash_Wrp" class="flash-wrp flash-{%if navbar%}nav{%else%}unnav{%endif%}-{%if flashSize==1%}big{%else%}small{%endif%}">
		    <script>
			 document.write('<embed height="{%if flashSize==1%}700{%else%}600{%endif%}" flashvars="" pluginspage="http://www.adobe.com/go/getflashplayer" src="{{flashUrl}}" type="application/x-shockwave-flash" width="{%if flashSize==1%}1400{%else%}1000{%endif%}" wmode="opaque" quality="high" allowscriptaccess="always" id="Flash_Target">');
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
     showreg();
     {% endif %}
    </script>
</html>

