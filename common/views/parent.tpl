<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>{% block title %}{% endblock %} | Focus</title>
        <link rel="stylesheet" href="/common/static/css/main.css" type="text/css" media="screen" />
        {% block styles %}
        {% endblock %}
    </head>
    <body>
        <header id="header">
            <h1><img src="/common/static/img/logo.png" class="" alt="Focus" /></h1>
            <h2>{%block title%}{%endblock%}</h2>
            <div class="user">
                <p class="portrait"><img src="http://ufo.sogou-inc.com/static/portrait/zheng_xin.jpg" class="" alt="zhengxin" /></p>
                <ul class="func">
                    <li>View profile</li>
                    <li>Logout</li>
                    
                </ul>
            </div>
        </header>

        <div class="content">
            {% block content %}

            {% endblock %}
        </div>
        <script type="text/javascript" src="/common/static/js/global.js"></script>
        <script type="text/javascript">
         
         require(['./common/static/js/menu'] , function(menu){
             menu.init();
         });
         
        </script>
    </body>
</html>

