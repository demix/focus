define(function(){
    
    var projects = [];

    function register(project){
        projects.push(project);
    };

    register({
        name:'loginclient'
    });

    register({
        name:'test2'
    });
    register({
        name:'test3'
    });
    register({
        name:'test3'
    });
    register({
        name:'test3'
    });
    

    return{
        get: function(){
            return projects;
        }
    };
});
