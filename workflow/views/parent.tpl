{% extends '../../common/views/parent.tpl' %}


{% block title %}Workflow{% endblock %}

{% block styles %}
<link rel="stylesheet" href="./static/css/main.css" type="text/css" media="screen" />
{% endblock %}

{% block scripts %}
<script type="text/javascript">
 
 require(['./common/static/js/form'] , function(form){
     form.init();
 });
 

</script>
{% endblock %}
