define(function(){



    return {
        componentDidMount: function(){
            this.getBackboneModels().forEach(function(model){
                model.on('add change remove' , this.forceUpdate.bind(this,null) , this);
            } , this);
        },
        componentWillUnmount: function(){
            this.getBackboneModels().forEach(function(model){
                model.off(null , null, this);
            } , this);
        }
    };
});
