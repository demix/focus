 
define(['react' ,'bbhelper' , 'jsx!views/index','jsx!views/quick' ,'models'],function(React , BackboneHelper , IndexView ,QuickView,models){

    var router;
    var viewRoot  = document.getElementById('Content');


    var Actions ={
        index: function(){
            React.renderComponent(
                IndexView(),
                viewRoot
            );

        },
        quick: function(){
            var collection = models.init(window['token'] , function(){});
            collection.forEach(function(model){
                if( model.get('selected') ){
                    model.set({selected:false});
                }
            });

            React.renderComponent(
                QuickView({model:collection}), 
                viewRoot
            );
        },
        full: function(){
            //React.unmountComponentAtNode(viewRoot);
        }
    };
    

    function initRouter(){
        var WorflowRouter = Backbone.Router.extend({
            routes: {
                '' : 'index',
                'quick': 'quick',
                'full'  :'full'
            },
            index: Actions.index,
            quick: Actions.quick,
            full: Actions.full
        });
        router = new WorflowRouter();
        window.router = router;
    };



    return {
        init: function(){

            initRouter();
     

            Backbone.history.start({
                pushState:true,
                root: "/workflow/"
            });


            BackboneHelper.overrideLinks(router);

        },
        reset: function(name){
            Actions[name] && Actions[name]();
        }
    };
});
