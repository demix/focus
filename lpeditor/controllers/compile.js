var fs = require('fs'),
    path = require('path'),
    swig = require('swig'),
    minify = require('html-minifier').minify,
    uglify = require('uglify-js'),
    cleancss = require('clean-css');




exports.compile = function(config , debug , callback){
    var sys={
        cssurl : './static/release/main.css',
        navcssurl : './static/release/nav.css',
        jsurl : './static/release/main.js',
        navjsurl : './static/release/nav.js',
        debug: debug
    };
    

    config.sys = sys;

    var filefolder = path.join(__dirname , '..');

    
    var css = fs.readFileSync(path.join(filefolder , config.sys.cssurl));
    var js = fs.readFileSync(path.join(filefolder, config.sys.jsurl));
    var navcss = fs.readFileSync(path.join(filefolder,config.sys.navcssurl) );
    var navjs = fs.readFileSync(path.join(filefolder,config.sys.navjsurl));
    config.sys.css = css.toString();
    config.sys.js = js.toString();
    config.sys.navcss = navcss.toString();
    config.sys.navjs = navjs.toString();

    if(!debug){
        config.sys.js = uglify.minify(config.sys.js , {fromString:true}).code;
        config.sys.navjs = uglify.minify(config.sys.navjs,{fromString:true}).code;

        config.sys.css= new cleancss({keepSpecialComments:0}).minify(config.sys.css);
        config.sys.navcss= new cleancss({keepSpecialComments:0}).minify(config.sys.navcss);
        config.css = new cleancss({keepSpecialComments:0}).minify(config.css);
    }

    var html = swig.renderFile( path.join(filefolder , 'views' , 'release.tpl'),config);

    if( !debug ){
        html = minify(html , {
            removeComments: true,
            collapseWhitespace: true
        });
    }
    html = html.replace(/<\/style><style>/ig , '');
    html = html.replace(/<\/script><script>/ig , '');
    callback && callback(html);

};
