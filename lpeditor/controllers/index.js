/**
 * index.js
 *
 * changelog
 * 2014-03-18[12:12:17]:created
 * 2014-06-17[22:53:48]:add delete
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/controllers
 * @author yanni4night@gmail.com
 * @version 0.0.2
 * @since 0.0.1
 */
var fs = require('fs'),
  async = require('async'),
  path = require('path'),
  exec = require('child_process').exec;

const JSON_DIR = __dirname + "/../json/";
const PROFILE_DIR = __dirname + '/../static/profile/';

var TARGET_URI;
if(process.env.NODE_ENV == 'development'){
  TARGET_URI='root@10.136.31.61:/opt/my/'
}else{
  TARGET_URI='root@10.11.201.212:/search/wan/webapp/static/nav/'
}

var app = {
  /**
   * [get description]
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  index: function(req, res) {
    return res.render('index', {});
  },
  /**
   * [delete description]
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  delete: function(req, res) {
    var id = req.body.id;
    if (!/^\d{13}$/.test(id)) {
      return res.json({
        status: -1,
        msg: 'ID is needed'
      });
    }

    return fs.unlink(JSON_DIR + id + ".json", function() {
      return res.json({
        status: 0,
        id: id
      });
    });
  },
  /**
   * [preview description]
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  preview: function(req, res) {
    var css = req.body.css || '';
    var html = req.body.html || '';
    return res.render('preview', {
      css: css,
      html: html
    });
  }, //preview
  /**
   * [release description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   */
  release: function(req, res) {

    var debug = +req.query.debug;

    var config = !debug ? JSON.parse(req.body.config) : JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mock', 'landing.json')));
    var filedir,filepath;

    if (!/^\d{13}$/.test(config.id) && !debug) {
      return res.json({
        status: 0,
        msg: 'ID is needed'
      });
    }
    var idDate = new Date(+config.id);

    filedir = PROFILE_DIR;//+([idDate.getFullYear(),idDate.getMonth()+1].join(''));
    filepath = filedir+config.id+'.html';

    return require('./compile').compile(config, debug, function(filecontent) {

      if (debug) {
        res.send(filecontent);
        return;
      }

      async.series([
        function(callback) {
          fs.exists(filedir, function(exists) {
            if (!exists) {
              fs.mkdir(filedir, callback);
            } else {
              callback();
            }
          });
        },
        function(callback) {
          fs.writeFile(filepath, filecontent, callback);
        },
        function(callback) {
          exec('rsync -avz ' + filepath + ' ' +TARGET_URI, callback);
        }

      ], function(error) {
        return res.json({
          status: error ? -1 : 0,
          id: config.id,
          msg: error
        });
      });


    });
  },
  /**
   * This is just a file-system version of persistence,
   * U should use mongoDB instead.
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  save: function(req, res) {

    var id = req.body.id; //may be undefined
    var payload = req.body.payload; //json data

    var profileId = id;
    try {
      if (!payload) {
        throw Error('payload should not be empty');
      }
      JSON.parse(payload);
    } catch (e) {
      return res.json({
        msg: e.message,
        status: -1
      });
    }

    async.series([
      //check directory
      function(callback) {
        fs.exists(JSON_DIR, function(exists) {
          if (!exists) {
            fs.mkdir(JSON_DIR, function(error) {
              callback(error);
            })
          } else
            callback();
        });
      },
      //create id
      function(callback) {
        profileId = id ? id : Date.now()
        callback();
      },
      //write json
      function(callback) {
        fs.writeFile(JSON_DIR + profileId + '.json', payload, function(error) {
          callback(error);
        });
      }
    ], function(error) {
      return res.json({
        msg: error,
        status: error ? -1 : 0,
        created: !id, //是创建还是修改，取决于又没有id
        id: profileId //需要返回新生成的id
      });
    });

  }, //save
  /**
   * List all
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  list: function(req, res) {
    return fs.readdir(JSON_DIR, function(error, filenames) {
      if (error) {
        return res.json({
          status: error ? -1 : 0,
          msg: error
        });
      } else {

        //Get description
        var ret = [];
        return async.map(filenames, function(filename, callback) {
          fs.readFile(JSON_DIR + filename, {
            encoding: 'UTF-8'
          }, function(error, content) {
            try {
              var data = JSON.parse(content);
              ret.push([filename, data.desc || '']);
            } catch (e) {}
            callback();
          });
        }, function(error, result) {
          return res.json({
            status: 0,
            data: ret //返回的数据中，包含文件名(即包含id)，和desc
          });
        });


      }
    });
  }, //list
  /**
   * [get description]
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  get: function(req, res) {
    var id = req.body.id;
    if (!/^\d+$/.test(id)) {
      return res.json({
        status: -1,
        msg: 'id is required'
      });
    }
    return fs.readFile(JSON_DIR + id + '.json', {
      encoding: 'UTF-8'
    }, function(error, content) {
      return res.json({
        status: error ? -1 : 0,
        msg: error,
        data: content //理论上，content应该是合法的json字符串
      });
    });
  }, //get
  create:function(req,res){
    return res.render('create',{});
  }
};

module.exports = app;