{% extends './parent.tpl' %}



{% block content %}

<div class="content" >
    <h3>
        Select Gitlab Project you want to <b>flow</b>
    </h3>
    <div id="Content">
        
    </div>
</div>

{% endblock %}


{% block scripts %}
<script type="text/javascript">

 var token = "{{token}}";

 require.config({
     baseUrl:'./static/js',
     paths:{
         bbmixin:'/common/static/js/bbmixin',
         react: '/common/static/3rd/react',
         JSXTransformer:'/common/static/3rd/JSXTransformer',
         jsx:'/common/static/3rd/jsx',
         text:'/common/static/3rd/text'
     }
 });

 require(['main'] , function(main){
     main.init();
 } );
 

</script>
{% endblock %}
