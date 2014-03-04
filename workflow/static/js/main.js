 
define(['react','jsx!view','models'],function(React,View,models){


    
    



    return {
        init: function(){
            var collection = models.init(window['token'] , function(){});
            React.renderComponent(
                View({model:collection}),
                document.getElementById('Content')
            );
        }
    };
});
