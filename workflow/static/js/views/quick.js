define(['react' , 'bbmixin' , 'jsx!views/quick/step1' , 'views/quick/step2' ] , function(React , BackboneMixin , Step1View , Step2){


    var View = React.createClass({

        handleStep1: function(){
            var projectID = $('.step1 .project-list').val();

            var model = this.props.model.filter(function(item){
                return item.get('id') == projectID;
            })[0];
            model.set('selected' , false);

            var type;
            $('.step1 input[name=bttype]').forEach(function(item){
                if( item.checked )
                    type = $(item).parent().text().toLowerCase();
            });
            var tvalue = $('.step1 select[name='+type+']').val();
            

            React.unmountComponentAtNode(document.getElementById('Content'));
            $('#Content').html('<h3></h3><div class="fc-form" id="ContentInner"></div>');
            Step2.init({
                project: model,
                type: type,
                tvalue: tvalue
            });
            
        },

        render: function(){
            return (
                <div className="step1">
                    <Step1View model={this.props.model} onStep={this.handleStep1.bind(this)}/>
                </div>
            );
        }
    });

    return View;
});