{% extends '../../common/views/parent.tpl' %}


{% block title %}Ocean{% endblock %}

{% block styles %}
<link rel="stylesheet" href="/static/css/main.css" type="text/css" media="screen" />
{% endblock %}

{% block content %}
<div>
    <h3>Welcome!</h3>
    <h4>This is your first time meet <b>Focus</b>. Please complete your profile in <b>Focus</b>.</h4>
    
    <div class="login-form">
        <form method="post" id="" action="" class="fc-form">
            <p class="desc">Basic info</p>
            <p>
                <label>Nickname</label>
                <input type="text" name="" value="" />
            </p>
            <p class="desc">Gitlab binding</p>
            <p>
                <label>Gitlab Acc</label>
                <input type="text" name="" value="" />
            </p>
            <p>
                <label>Gitlab Password</label>
                <input type="password" name="" value="" />
            </p>
            <p class="submit">
                <button type="submit"><span>Submit</span></button>
            </p>
        </form>
        
    </div>
    
</div> 
{% endblock %}
