define(function(){
    
    var root;

    var doBuild = function(data){
        $.getJSON('/workflow/project/build' , data , function(data){
            if( +data.status ){
                showError(data);
            }else{
                showBuildedNotice(data);
            }
        });
    };

    var showAddition = function(data){
        if( data.stdout || data.stderr ){
            root.append('<div class="addition-info"><p>Addition info:</p>' + data.stdout + '<br/>' + data.stderr + '</div>');
        }
    };

    var showError = function(data){
        var msg = data.msg || 'Unknown Error.';
        root.append('<p class="error">'+ msg +'</p>');
        showAddition(data.data);
        root.append('<p class="reselect"><button class="submit">Back to Project List</button></p>');
        root.find('.build button').attr('disabled' , null).text('Rebuild!');

        root.find('.reselect button').click(function(){
            require(['main'] , function(main){
                main.reset('temp');
            });
        });
    };

    var showBuildNotice = function(data){
        root.append('<p>Init success. Continue to build?</p>');
        
        var formhtml = '<p class="btn build"><button class="submit">Yes, Build!</button>';
        if( data.params ){
            formhtml += '<select class="params"><option value="">-- Select param --</option>';
            formhtml += data.params.map(function(item){
                return '<option value="'+ item +'">'+ item +'</option>';
            }).join('');
            formhtml += '</select>';
        }
        formhtml += '</p>';
        root.append(formhtml);

        delete data.params;
        

        root.find('.build button').click(function(){
            $(this).attr('disabled' , 1);
            var node = $('.build').next();
            while(node && node.length){
                node.remove();
                node = $('.build').next();
            }

            data.shell_param = root.find('select.params').val() || '';
            root.append('<p clas="desc">Building...</p>');
            doBuild(data);
        });
    };

    var showBuildedNotice = function(data){
        root.append('<p class="success">Build Success.</p>');
        root.append('<p class="success"><a href="'+ data.data.pwd +'">Download Package.</a></p>');
        
        showAddition(data.data);
    };

    return {
        init: function(data){
            root = $('#ContentInner');
            $('.content h3').html('Building progress start');

            root.html('<p>Init project, Please wait.</p>');

            $.getJSON('/workflow/project/init' , {
                type:data.type,
                tvalue: data.tvalue,
                projid: data.project.get('id'),
                projpn: data.project.get('path_with_namespace'),
                projpath: data.project.get('path'),
                tm: +new Date()
            } , function(data){
                if( +data.status ){
                    showError(data);
                }else{
                    showBuildNotice(data.data);
                }
            });
        }
    };
});
