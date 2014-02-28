define(function(){



    return {
        init: function(){
            
            $('#header .portrait img').click(function(){
                $('#header .func').toggleClass('show');
            });

            $('#header .func li').click(function(){
                if( $(this).data('href') ){
                    location.href = [location.origin , $(this).data('href')].join('/');
                }
            });

            $('#header .apps-icon').click(function(){
                $(this).toggleClass('show');
                $('#header .apps-list-wrp').toggleClass('show');
            });
            $('#header .apps-list li').click(function(){
                location.href = [location.origin , $(this).text().toLowerCase() , '' ].join('/');
            });
        }
    };
});
