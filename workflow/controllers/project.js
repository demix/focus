var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var swig = require('swig');
var _ = require('lodash-node');


var base = process.cwd();
var ERROR_MSG = {
    1000: "Can't find build.sh",
    1001: 'Output is not generated. See your build file.'
};

var Action = {
    init: function(data , callback){
        var buildID = +new Date();

        data.path = data.projpath + '_' + buildID;
        
        var shell_cmd = swig.render(
            'cd tmp;git clone git@gitlab.upd.sogou-inc.com:{{ projpn }} {{path}};'
            + 'cd {{path}}; git checkout{% if type=="branch" %} -b{% endif %} {{tvalue}};'
            + '{% if type=="branch" %}git pull origin {{tvalue}}{% endif %}'
        , {locals:data});


        fs.mkdir(path.join(base , 'tmp') , function(){
            child_process.exec(shell_cmd , function(error , stdout , stderr){
                if( error === null ){
                    var buildFile = path.join( 'tmp' , data.path , 'build.sh' );
                    var cbdata = {
                        buildID : buildID,
                        path: data.projpath
                    };
                    fs.readFile( buildFile , function(err,data){
                        if( err ){
                            callback(1000 , cbdata);
                        }else{
                            var buildContent = data.toString();
                            var matchResult = buildContent.match( /#.*params: *([\w ,]+)/i );
                            var params = [];
                            if( matchResult ){
                                params = matchResult[1].split(',').map(function(item){
                                    return item.trim();
                                });
                            }
                            callback(0 , _.assign(cbdata , {
                                params:params
                            }));
                        }
                    } );
                }else{
                    callback(1);
                }
            });
        });
    },
    build: function(data , callback){
        data.filename = data.path + '_' + data.buildID;
        
        var shell_cmd = swig.render(
            'cd tmp; cd {{filename}};sh build.sh {{shell_param}};'
        , {locals:data});


        child_process.exec(shell_cmd , function(error, stdout , stderr){
            var outputDir = path.join( 'tmp' , data.path + '_' + data.buildID , 'output' );
            fs.stat(outputDir , function(err, state){
                data = _.assign(data , {
                    stdout: stdout || '',
                    stderr: stderr || ''
                });
                
                if( err || !state.isDirectory ){
                    if( err ){
                        callback(1001 , data);
                    }else{
                        callback( 1 );
                    }
                }else{
                    var zip_cmd = swig.render(
                        'cd tmp; cd {{filename}}; zip "{{filename}}.zip" -r output; '
                     , {locals: data});

                    child_process.exec(zip_cmd , function(err){
                        var tt = new Date();

                        data.ttfolder = [tt.getFullYear() , tt.getMonth()].join('');
                        fs.mkdir( path.join(base , 'packages') , function(){
                            fs.mkdir( path.join(base , 'packages' , data.ttfolder) , function(){
                                var final_cmd = swig.render( 
                                    'mv tmp/{{filename}}/{{filename}}.zip packages/{{ttfolder}}' 
                                    , {locals: data});
                                child_process.exec(final_cmd , function(){
                                    data.pwd = ['packages' , data.ttfolder , data.filename + '.zip'].join('/');
                                    callback( 0 , data );
                                });
                            } );
                        } );
                    });

                }
            });
        });
    }
};


exports.get = function(req,res){

    var action = req.param('action'); 
    if( !Action[action] ){
        res.send(404);
    }else{
        Action[action](req.query , function(status , data){
            res.json({
                status:status,
                msg: ERROR_MSG[status] || '',
                data : data || ''
            });

        });
    }

};
