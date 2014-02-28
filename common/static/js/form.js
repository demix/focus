define(function(){
    

    return {
        init: function(){
            
            var form = $('form.fc-form');

            form.on('submit' , function(e){
                e.preventDefault();
                
                var url = $(this).attr('action');
                var submitbtn = form.find("button[type='submit']");
                var result = form.find('.submit-result');
                submitbtn.attr('disabled' , 1);
                $.post(url , $(this).serialize() , function(response){
                    if( +response.status ){
                        form.find("button[type='submit']").attr('disabled' , null);
                        result.show().addClass('error').html('System Error');
                    }else{
                        result.show().addClass('success').html('success');
                        var successUrl = form.data('success');
                        if( successUrl ){
                            setTimeout(function(){
                                window.location = successUrl.indexOf('http') == 0 ? successUrl :
                                    location.origin + successUrl;
                            } , 2000);
                        }
                    }
                    
                });
            });
            
        }
    };
});
