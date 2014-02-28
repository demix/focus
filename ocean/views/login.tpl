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
                <input type="text" name="uname" value="{{sid}}" />
            </p>
            <p>
                <label>Role</label>
                <select name="role">
                    <option value="0">Backend Engineer</option>
                    <option value="1">Frontend Engineer</option>
                    <option value="2">Prodoct Designer</option>
                    
                </select>
            </p>
            <p class="desc">Gitlab binding</p>
            <p>
                <label>Gitlab Acc</label>
                <input type="text" name="gitlabacc" value="" />
            </p>
            <p>
                <label>Gitlab Password</label>
                <input type="password" name="gitlabpwd" value="" />
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
