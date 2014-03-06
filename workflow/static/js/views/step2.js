define(['react' , 'bbmixin' ] , function(React , BackboneMixin){


    var View = React.createClass({
        mixins: BackboneMixin,
        getBackboneModels:function(){
            return [this.props.model];
        },
        render: function(){
            return (
                <span>{this.props.type}</span>
            );
        }
    });

    return View;

});
