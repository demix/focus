define(['react' , 'bbmixin' , 'jsx!views/quick/step1' , 'jsx!views/quick/step2' ] , function(React , BackboneMixin , Step1View , Step2View){
    
    var viewRoot , collection;

    var View = React.createClass({
        current_step:1,
        getInitialState: function(){
            return{ current_step:1, project:null, type:null, tvalue:null };
        },
        handleStep1: function(){

            var projectID = $('.step1 .project-list').val();

            var model = this.props.model.filter(function(item){
                return item.get('id') == projectID;
            })[0];
            model.set('selected' , false);

            
            var type,tvalue;
            $('.step1 input[name=bttype]').forEach(function(item){
                if( item.checked )
                    type = $(item).parent().text().toLowerCase(); //tag or branch
            }.bind(this));

            tvalue = $('.step1 select[name='+type+']').val();

            this.setState({project: model});
            this.setState( {tvalue:  tvalue});
            this.setState( {type:  type});
            this.setState( {current_step:2} );
            
        },
        handleBack: function(){
            this.setState({current_step:1});
        },

        render: function(){
            if( this.state.current_step == 1 ){
                return (
                        <div className="step1">
                            <Step1View model={this.props.model} onStep={this.handleStep1.bind(this)}/>
                        </div>
                );
            }else{
                return (
                    <div className="step2">
                        <Step2View project={this.state.project} type={this.state.type} tvalue={this.state.tvalue} 
                        onBack={this.handleBack.bind(this)}/>
                     </div>
                );
            }
        }
    });

    return{
        init: function(root , cl){
            viewRoot = root;
            collection = cl;
            React.renderComponent(
                View({model:collection}), 
                viewRoot
            );
            
        }
    };
});
