<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>{% block title %}{% endblock %} | Focus</title>
        <link rel="stylesheet" href="./common/static/css/main.css" type="text/css" media="screen" />
        {% block styles %}
        {% endblock %}
    </head>
    <body>
        <header id="header">
            <h1><img src="./common/static/img/logo.png" class="" alt="Focus" /></h1>
            <div class="title-bar">
                <h2>{%block title%}{%endblock%}</h2>
                <div class="apps">
                    <p class="apps-icon"></p>
                    <div class="apps-list-wrp">
                        <p class="triangle"></p>
                        <ul class="apps-list">
                            <li>Ocean</li>
                            <li>Workflow</li>
                            <li>Test1</li>
                            <li>Test2</li>
                            <li>Test3</li>
                            <li>Test4</li>
                            <li>Test2</li>
                            <li>Test3</li>
                            <li>Test4</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="user">
                <p class="portrait"><img src="./common/static/img/portrait.png" class="" alt="zhengxin" /></p>
                <ul class="func">
                    <li data-href="ocean/profile">View profile</li>
                    <li>Logout</li>
                    
                </ul>
            </div>
        </header>
        <div class="content">
            {% block content %}

            {% endblock %}
        </div>
        <script type="text/javascript" src="./common/static/js/global.js"></script>
        <script type="text/javascript">
         
         require(['./common/static/js/menu'] , function(menu){
             menu.init();
         });
         
        </script>
        {% block scripts %}{% endblock %}
    </body>
</html>

