define(['react' , 'bbmixin' ] , function(React , BackboneMixin){


    var ProjectsSelectView = React.createClass({
        handleSelectChange: function(e){
            var id = e.target.value;
            this.props.items.forEach(function(item){
                item.set('selected' , id == item.get('id') ? true : false);
            });
        },
        render: function(){

            var options = this.props.items.map(function(item){
                return (
                    <option value={item.get('id')}>{item.get('path_with_namespace')}</option>
                );
            });

            return (
                <select onChange={this.handleSelectChange.bind(this)}>
                    <option>--Choose one--</option>
                    { options }
                </select>
            );
        }
    });


    var View = React.createClass({
        mixins:[BackboneMixin],
        getBackboneModels:function(){
            return [this.props.model];
        },
        
        render: function(){
            return (
                <div className="fc-form label-block">
                    <p>
                        <label>Select a Project To Continue:</label>
                        <ProjectsSelectView items={ this.props.model }/>
                     </p>
                </div>
            );
        }
    });

    return View ;
});
