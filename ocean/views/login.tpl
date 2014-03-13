{% extends 'parent.tpl' %}


{% block content %}
<div>
    <h3>Welcome {{sid}}!</h3>
    <h4>This is your first time meet <b>Focus</b>. Please complete your profile in <b>Focus</b>.</h4>
    
    <div class="login-form">
        <form method="post" id="" action="login" class="fc-form" data-success="/ocean/profile">
            <input type="hidden" name="sid" value="{{sid}}" />
            <p class="desc">Basic info</p>
            <p class="required">
                <label>Nickname</label>
                <input type="text" name="uname" value="{{uname || sid}}" />
            </p>
            <p>
                <label>Role</label>
                <select name="role">
                    {% for idx,item in types %}
                    <option {% if idx == role %}selected{%endif%} value="{{idx}}">{{item}}</option>
                    {% endfor %}
                </select>
            </p>
            <p class="portrait-wrp">
                <label>Portrait</label>
                <span class="portrait">
                    <span id="PortraitUploader" {% if portrait %}class="img"{%endif%}>
                        {% if portrait %}
                        <img src="{{portrait}}"  />
                        {% else %}
                        Drag Your Portrait Here
                        {% endif %}
                    </span>
                </span>
            </p>
            <p class="desc">Gitlab binding</p>
            <p>
                <label>Gitlab Acc</label>
                <input type="text" name="gitlabacc" value="{{gitlabacc}}" />
            </p>
            <p>
                <label>Gitlab Password</label>
                <input type="password" name="gitlabpwd" value="{{gitlabpwd}}" />
            </p>
            <p class="submit-result">
            </p>
            <p class="btns">
                <button class="submit" type="submit"><span>Submit</span></button>
            </p>
        </form>
        
    </div>
    
</div> 
{% endblock %}


{% block scripts %}
{% parent %}

<script type="text/javascript">
 require(['./static/js/portrait'] , function(portrait){
     portrait.render($('#PortraitUploader'));
 });


</script>


{% endblock %}
