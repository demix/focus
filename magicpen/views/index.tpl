{% extends './parent.tpl' %}




{% block content %}

<div id="Container" class="container">
    <div class="index-loading">
        <div class="progress">
            <p></p>
        </div>
        <script type="text/tpl">
            <h4>Choose project to create</h4>
            <ul class="project-list">
                <% for(var i=0,l=data.length;i<l;i++){ %>
                <li><%=data[i].name%></li>
                <%}%>
            </ul>
        </script>
    </div>
</div>

{% endblock %}


{% block scripts %}
<script type="text/javascript">

 require.config({
     baseUrl:'/magicpen/static/js',
     paths:{
         text:'/common/static/3rd/text'
     }
 });

 
 require(['seed'] , function(seed){
     seed.init();
 });
 

</script>
{% endblock %}
