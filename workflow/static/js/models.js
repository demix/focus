define(function(){
    var TOKEN = '';
    
    var ProjectModel = Backbone.Model.extend({
        defaults:{
            selected: false
        },
        url: function(){
            return ['' , 'api/gitlab/projects' , this.get('id') , 'repository/branches'].join('/');
        },
        initialize: function(){
            this.on('change:selected' , function(model,value){
                if(value){
                    this.fetch({data:{private_token:TOKEN} , success: this.fetchSuccess.bind(this)});
                }
            });
        },
        fetchSuccess: function(){
            console.log(1)
        }
        
    });
    
    var ProjectsCollection = Backbone.Collection.extend({
        model: ProjectModel,
        url: '/api/gitlab/projects',
        initialize: function(token){


            this.fetch({
                data:{
                    private_token:TOKEN
                },
                success: this.fetchSuccess.bind(this)
            });
        },
        fetchSuccess: function(){
            //this.at(0).set('selected' , true);
        }
    });
    


    return {
        init: function(token , callback){
            TOKEN = token;
            var projects = new ProjectsCollection();
            return projects;
        }
    };
});
