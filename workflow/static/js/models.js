define(function(){
    var TOKEN = '';
    
    var ProjectModel = Backbone.Model.extend({
        defaults:{
            selected: false
        },
        url: function(){
            return {
                branches: ['' , 'api/gitlab/projects' , this.get('id') , 'repository/branches'].join('/'),
                tags: ['' , 'api/gitlab/projects' , this.get('id') , 'repository/tags'].join('/')
            };
        },
        initialize: function(){
            this.on('change:selected' , function(model,value){
                if(value){
                    this.fetch({private_token:TOKEN,per_page:100});
                }
            });
        },
        fetch: function(data){
            this._fetchTime = 0;
            Object.keys(this.url()).forEach(function(type){
                if( !this.get(type) ){
                    $.getJSON( this.url()[type] + '?' + $.param(data) , function(data){
                        this._fetchTime ++;
                        this.set(type , data);
                        this._fetchSuccess();
                    }.bind(this));
                }else{
                    this._fetchTime++;
                    this._fetchSuccess();
                }
            }.bind(this));
        },
        _fetchSuccess: function(){
            if( this._fetchTime == Object.keys(this.url()).length ){

            }
        }
        
    });
    
    var ProjectsCollection = Backbone.Collection.extend({
        model: ProjectModel,
        url: '/api/gitlab/projects',
        initialize: function(token){


            this.fetch({
                data:{
                    private_token:TOKEN,
                    per_page:100
                },
                success: this.fetchSuccess.bind(this)
            });
        },
        fetchSuccess: function(){
            //this.at(0).set('selected' , true);
        }
    });
    
    var projects;

    return {
        init: function(token , callback){
            TOKEN = token;
            !projects && ( projects = new ProjectsCollection());
            return projects;
        }
    };
});
