/**
 * index.js
 *
 * changelog
 * 2014-03-18[12:12:17]:created
 * 2014-06-17[22:53:48]:add delete
 * 2014-06-26[07:58:22]:clean
 * 2014-06-26[08:22:22]:preview using compiler
 * 2014-06-26[08:37:31]:register to back-end system
 * 2014-06-26[10:23:44]:sh 212 rsync_static2m1.sh
 *
 * @author yanni4night@gmail.com
 * @version 0.0.6
 * @since 0.0.1
 */
var fs = require('fs'),
  async = require('async'),
  path = require('path'),
  request = require('request'),
  compiler = require('./compile'),
  exec = require('child_process').exec;

const JSON_DIR = __dirname + "/../json/";
const PROFILE_DIR = __dirname + '/../static/profile/';

var dev = process.env.NODE_ENV === 'development';
var TARGET_URI, ONLINE_URL;

if (dev) {
  TARGET_URI = 'root@10.136.31.61:/opt/my/';
  ONLINE_URL = 'http://10.136.31.61/';
} else {
  TARGET_URI = 'root@10.11.201.212:/search/wan/webapp/static/nav/';
  ONLINE_URL = 'http://wan.sogou.com/static/nav/';
}

var app = {
  /**
   * Index page
   * 
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  index: function(req, res) {
    return res.render('index', {});
  },
  /**
   * Delete json config file.
   * 
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
   * Show preview by posting.
   * 
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  preview: function(req, res) {
    var config = req.body.config;
    config = JSON.parse(config);

    return compiler.compile(config, true, function(content) {
      return res.send(content);
    })
  }, //preview
  /**
   * Release bulk of landing pages.
   *
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  release: function(req, res) {
    var pages = JSON.parse(req.body.pages||"");
    //pages has to be an array
    if (!Array.isArray(pages)) {
      return res.json({
        status: -1,
        msg: 'pages 格式不正确'
      })
    }

    var filedir = PROFILE_DIR;

    return async.map(pages, function(page, callback) {

      return compiler.compile(page, false, function(filecontent) {
        //We use timestamp to create an unique id name
       var fileid = Date.now() + '' + ((Math.random() * 1e6) | 0);
        var filename = fileid + '.html';

        var filepath = filedir + filename;
        var fileurl = ONLINE_URL + filename;

        return async.series([
          //create directory if not exists
          function(callback) {
            fs.exists(filedir, function(exists) {
              if (!exists) {
                return fs.mkdir(filedir, callback);
              } else {
                return callback();
              }
            });
          },
          //write file
          function(callback) {
            return fs.writeFile(filepath, filecontent, callback);
          },
          //upload
          function(callback) {
            return exec(['rsync', '-avz', filepath, TARGET_URI].join(' '), callback);
          }
          ,
          //rsync from 212 to online
          function(callback) {
            if (dev) {
              return callback();
            }
            return exec(['ssh', '-l', 'root', '10.11.201.212', '"sh /search/script/publishscript/rsync_static2m1_new.sh static/nav/' + filename + '"'].join(' '), callback);
          },

          //we remove it after upload
          function(callback) {
            //ignore unlink failure
            fs.unlink(filepath, function() {});
            return callback();
          },
          //register to http://10.12.135.37/api/landpageHtml.do
          function(callback) {
            if (dev) {
              return callback();
            }

            return request.post('http://10.12.135.37/api/landpageHtml.do?lpageUrl=' + encodeURIComponent(fileurl + "?fl=" + page.lpid) + '&lpageFl=' + page.lpid + '&lpageName=' + encodeURIComponent(page.lpname), function(error, response, body) {
              if (error) {
                return callback(error);
              }
              if (200 === response.statusCode && 'success' === String(body).trim()) {
                return callback();
              } else {
                return callback(new Error(String(body) || ('HTTP:' + code)));
              }

            });
          }

        ], function(error) {
          return callback(error, fileurl+"?fl="+page.lpid+"&gid=2");
        });

      });

    }, function(err, urls) {
      //return online html list
      return res.json({
        status: err ? -1 : 0,
        msg: err&&err.message,
        urls: urls
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
        fs.writeFile(JSON_DIR + profileId + '.json', payload, callback);
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
   * Get bulk of configrations by multiple ids.
   *
   * We support mutiple by IDs splited by ','.
   *
   * If only one id exists,we return an object instead of an array.
   *
   * @param  {Express Request} req
   * @param  {Express Response} res
   */
  get: function(req, res) {
    var id = req.param('id');
    if (!id) {
      return res.json({
        status: -1,
        msg: 'id is needed'
      });
    }
    var idArr = id.split(',');

    //validate every id
    if (!idArr.every(function(idx) {
      return /^\d{13}$/.test(idx);
    })) {
      return res.json({
        status: -1,
        msg: 'every id has to be a unix stamp'
      });
    }

    return async.map(idArr, function(id, callback) {
      return fs.readFile(JSON_DIR + id + '.json', {
        encoding: 'UTF-8'
      }, callback);
    }, function(error, contents) {
      if (error) {
        return res.json({
          status: -1,
          msg: error
        });
      }

      try {
        //we parse JSON here
        var rearr = contents.map(function(content) {
          return JSON.parse(content);
        });
        return res.json({
          status: error ? -1 : 0,
          msg: error,
          data: rearr.length === 1 ? rearr[0] : rearr
        });
      } catch (e) {
        return res.json({
          status: -1,
          msg: e
        });
      }

    });

  }
};

module.exports = app;