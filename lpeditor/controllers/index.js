/**
 * index.js
 *
 * changelog
 * 2014-03-18[12:12:17]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/controllers
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
var fs = require('fs'),
  async = require('async');

const JSON_DIR = "./json/";

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
        created: !id,
        id: profileId
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
            data: ret
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
        data: content
      });
    });
  } //get
};

module.exports = app;