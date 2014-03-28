define(['react' , 'bbmixin' ] , function(React , BackboneMixin){



    var BTSelectView = React.createClass({
        handleRadioCheck: function(){
            var branchCheck = this.refs.branch.getDOMNode().checked;
            var tagCheck = this.refs.tag.getDOMNode().checked;
            this.props.onRadioCheck(branchCheck || tagCheck);
        },
        render: function(){
            var branches, tags , dorender = false;
            this.props.items.every(function(item){
                if( item.get('selected') ){
                    if( !_.isUndefined(item.get('branches')) && !_.isUndefined(item.get('tags')) ){
                        branches = item.get('branches');
                        tags = item.get('tags');
                        dorender = true;
                    }
                    return false;
                }
                return true;
            });

            if( dorender ){
                var branchitems = branches.map(function(item) {
                    return (
                        <option value={item.name}>{item.name}</option>
                    );
                });

                var tagitems =  tags.map(function(item){
                    return (
                        <option value={item.name}>{item.name}</option>
                    );
                }) ;

                var branchStyle = {
                    display: branchitems.length ? '' :'none'
                };
                var tagStyle = {
                    display: tagitems.length ? '' :'none'
                };

                return (
                    <p >
                        <label>Choose a Branch or Tag</label>
                        <span className="radiolist" style={branchStyle}>
                            <label className="radio"><input onChange={this.handleRadioCheck.bind(this)} type="radio" ref="branch" name="bttype" />Branch</label>
                            <select name="branch">
                                { branchitems }
                            </select>
                        </span>
                        <span className="radiolist" style={tagStyle}>
                            <label className="radio"><input onChange={this.handleRadioCheck.bind(this)} type="radio" ref="tag" name="bttype" />Tag</label>
                            <select name="tag">
                                { tagitems }
                            </select>
                        </span>
                    </p>
                );
            }else{
                return (
                    <span></span>
                );
            }
        }
    });


    var ProjectsSelectView = React.createClass({
        render: function(){
            var options = this.props.items.map(function(item){
                return (
                    <option value={item.get('id')}>{item.get('path_with_namespace')}</option>
                );
            });

            return (
                <select className="project-list" onChange={this.props.onProjectSelect}>
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
        getInitialState: function(){
            return {radioCheck:false , projectSelect:true};
        },
        handleRadioCheck: function(isCheck){
            this.setState({radioCheck:isCheck});
        },
        handleProjectSelect : function(e){
            var id = e.target.value;
            this.props.model.forEach(function(item){
                item.set('selected' , id == item.get('id') ? true : false);
            });
            this.setState({radioCheck:false,projectSelect:true});
        },
        
        render: function(){
            var btnStyle = {
                display: this.state.radioCheck ? '' : 'none'
            };

            return (
                <div>
                    <h3>
                    Select Gitlab Project you want to <b>flow</b>
                    </h3>
                    <div id="ContentInner" className="fc-form">
                        <div className="fc-form label-block">
                            <p>
                                <label>Select a Project To Continue</label>
                                <ProjectsSelectView items={ this.props.model } onProjectSelect={this.handleProjectSelect.bind(this)}/>
                            </p>
                            <BTSelectView items={ this.props.model } onRadioCheck={this.handleRadioCheck.bind(this)} />
                            <p style={btnStyle}>
                                <button onClick={this.props.onStep} className="submit">Next Step</button>
                            </p>
                        </div>
                    
                    </div>
                </div>
            );
        }
    });

    return View ;

    
});

