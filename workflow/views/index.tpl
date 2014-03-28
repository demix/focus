{% extends './parent.tpl' %}




{% block content %}

<div id="Content"  data-overridelink="1">
</div>

{% endblock %}


{% block scripts %}
<script type="text/javascript">

 var token = "{{token}}";

 require.config({
     baseUrl:'/workflow/static/js',
     paths:{
         bbmixin:'/common/static/js/bbmixin',
         bbhelper:'/common/static/js/bbhelper',
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
