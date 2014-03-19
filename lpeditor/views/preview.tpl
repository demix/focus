<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="author" content="yanni4night@gmail.com"/>
<title>Preview</title>
<style type="text/css">
    *{padding: 0;margin: 0;}
    html{background: rgba(0,0,0,0.5)}
    {{css|raw}}
</style>
</head>
<body>
    {{html|raw}}
</body>
<script src="http://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js"></script>
<script>
    $('#tab-new-reg').click(function(e){
                $('.tab').removeClass('on');
        $(this).addClass('on');

        $('#area-reg').show();
        $('#area-login').hide();
    });
    $('#tab-old-login').click(function(e){
        $('.tab').removeClass('on');
        $(this).addClass('on');
        $('#area-reg').hide();
        $('#area-login').show();
    });
    $('#close').click(function(e){
        window.close()
    });;
</script>
</html>
