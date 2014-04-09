define(['react' , 'bbmixin' ] , function(React , BackboneMixin){





    var View = React.createClass({
        mixins:[BackboneMixin],
        getBackboneModels:function(){
            return [this.props.project];
        },
        getInitialState: function(){
            return { progress: 'init' };
        },
        initProject: function(){
            var project = this.props.project;
            $.getJSON('/workflow/project/init' , {
                type:this.props.type,
                tvalue: this.props.tvalue,
                projid: project.get('id'),
                projpn: project.get('path_with_namespace'),
                projpath: project.get('path'),
                tm: +new Date()
            } , function(data){
                if( +data.status ){
                    this.errorData = data;
                    this.setState({progress:'error'});
                 }else{
                     this.buildData = data.data;
                     //showBuildNotice(data.data);
                     this.setState({progress:'inited'});
                 }

            }.bind(this));
        },
        componentDidMount: function(){
            if( this.state.progress == 'init' ){
                this.initProject();
            }
        },
        
        handleBuild: function(){
            this.refs.buildBtn.getDOMNode().disabled = true;

            this.buildData.shell_param = this.refs.buildParams.getDOMNode().value || '';
            

            this.setState({progress: 'building'});

            
            var gdata = _.clone(this.buildData);
            gdata.params = '';

            $.getJSON('/workflow/project/build' , gdata , function(data){
                this.errorData = data;
                if( +data.status ){
                    this.setState({progress:'builderror'});
                    $(this.refs.buildBtn.getDOMNode()).html('Rebuild!').attr('disabled' , null);;
                    
                }else{
                    this.buildedInfo = data.data;
                    this.setState({progress:'builded'});

                }
                

            }.bind(this));

        },
        
        render: function(){
            var additionError = function(){
                return(
                    <span></span>
                );
            };

            var showerror = function(){
                return (
                        <div>
                            <p class="error">{this.errorData.msg}</p>
                            { additionError }
                            <p class="reselect"><button onClick={this.props.onBack} className="submit">Back to Project List</button></p>
                        </div>
                );
            };

            var showAddition = function(){
                var error = this.errorData.data;
                if( error.stdout || error.stderr ){
                    return(
                            <div className="addition-info"><p>Addition info:</p> {error.stdout} <br/>{ error.stderr} </div>
                    );
                }
            };

            var progress = function(){
                if( this.state.progress == 'init' ){
                    return (
                            <p>Init project, Please wait.{this.initProject}</p>
                    );
                }else if(this.state.progress != 'error'){
                    return(
                        <div>
                            <p>Init success. Continue to build?</p>
                            <p className="btn build">
                                <button ref="buildBtn" onClick={this.handleBuild.bind(this)} className="submit">Yes, Build!</button>
                                <select ref="buildParams" className="params"><option value="">-- Select param --</option>
                                { this.buildData.params.map(function(item){
                                    return (<option value={item}>{item}</option>);
                                }) }
                                </select>
                            </p>
                        </div>
                    );
                }else{
                    return (
                        <div>{showerror.bind(this)()}{showAddition.bind(this)()}</div>
                    );
                }
            }.bind(this)();

            var buildresult = function(){
                if( this.state.progress == 'building' ){
                    return <p>Building...</p>;
                }else if(this.state.progress == 'builded'){
                    return(
                        <div>
                            <p className="success">Build Success.</p>
                            <p className="success"><a href={this.buildedInfo.pwd}>Download Package.</a></p>
                            {showAddition.bind(this)()}
                        </div>
                    );
                }else if(this.state.progress == 'builderror'){
                    return (
                        <div>{showerror.bind(this)()}{showAddition.bind(this)()}</div>
                    );
                }else {
                    return '';
                }
            }.bind(this)();
            

            return (
                <div>
                    <h3>
                    Building progress start
                    </h3>
                    <div id="ContentInner" className="fc-form">
                        <div className="fc-form label-block">
                            { progress }
                            { buildresult }
                        </div>
                    
                    </div>
                </div>
            );
        }
    });

    

    
    return View ;

    
    
});

