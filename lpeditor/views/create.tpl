<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Create</title>
    <style type="text/css"></style>
    <link rel="stylesheet" href="/static/css/create.css"/>
  </head>
<body class="f-f" >

<nav class="switch f-f f-vc f-hc">为flash匹配多个登录框</nav>

<!--one Flash to multiple dialogs-->
<div class="switch-content f-f ">
    <ul class="dialog-list dialogs f-1"></ul>
    <div class="control">
        <button>&lt;</button>
        <button>&gt;</button>
    </div>
    <ul class="dialogs"></ul>
</div>

<nav class="switch f-f f-vc f-hc bottom">为登录框匹配多个flash</nav>

<!--one dialog to multiple flashes-->
<div class="switch-content f-f hide">
    <ul class="dialog-list dailogs"></ul>
</div>
</body>
<script src="http://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js"></script>
<script>
    //switch
    (function(){
        var switches = $('.switch');
        switches.click(function(e){
            console.log($(this).index());
            switch($(this).index()){
                case 0:
                    switches.eq(1).addClass('bottom');
                    $('.switch-content').addClass('hide').eq(0).removeClass('hide');
                    break;
                case 2:
                    switches.eq(1).removeClass('bottom');
                    $('.switch-content').addClass('hide').eq(1).removeClass('hide');
                    break;
                default:;
            }
        });
    })();
</script>
<script>
    
</script>
<script type="text/javascript">
    $.get('/list').done(function(data){
        var dialogList$ = $('.dialog-list');
        if(Array.isArray(data.data)){
            data.data.forEach(function(item){
                dialogList$.append('<li data-file="'+item[0]+'">'+(item[1])+'('+item[0]+')</li>');
            });
        }
    });
    $('form').submit(function(e){
        e.preventDefault();
        alert('你以为');
    });
</script>
</html>
