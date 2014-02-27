define(function(){



    return {
        init: function(){
            
            $('#header .portrait img').click(function(){
                $('#header .func').toggleClass('show');
            });
        }
    };
});
