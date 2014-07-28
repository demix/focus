define(function(){
    
    var projects = [];

    function register(project){
        projects.push(project);
    };

    register({
        name:'test'
    });
    
    
    return{
        get: function(){
            return projects;
        }
    };
});
