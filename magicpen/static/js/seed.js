define(function(){
    
    var loadList = ['welcome','project', 'project_list','system'];

    var loaded = 0 , modules = {};

    
    function showProjects(){
        $('.progress').hide();
        $('.index-loading').css({
            width:800,
            height:500,
            'margin-top':-250,
            'margin-left':-400
        }).html(_.template($('.index-loading').find('script').html() , {
            data:modules['project_list'].get()
        }));

    }
    

    function checkLoaded(module){
        if(!module.ready || module.ready()){
            loaded ++;
            if(loaded == loadList.length){
                listLoaded();
                setTimeout(function(){
                    showProjects();
                },100);
            }
        }else{
            setTimeout(function(){
                checkLoaded(module);
            },200);
        }
        renderProgress();
    }

    function renderProgress(){
        $('.progress p').css('width', loaded/loadList.length*100+'%');
    }

    function listLoaded(){
        $('#header').addClass('up');
    }
    
    return{
        init: function(){
            loadList.forEach(function(item){
                require([item],function(module){
                    modules[item] = module;
                    checkLoaded(module);
                });
            });
            $('.index-enter').click(function(){
                document.documentElement.webkitRequestFullScreen();
            });
        }
    };
});
