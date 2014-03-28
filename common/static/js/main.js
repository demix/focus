define(['/common/static/js/event.js'] , function(event){
    
    return {
        init: function(){
            $(document).click(function(e){
                event.dispatchEvent('click' , e.target);
            });
            
            $('h2').click(function(){
                location.href = '/' + $(this).html().toLowerCase() + '/';
            });
        }
    };
});
