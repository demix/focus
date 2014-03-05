
/*
 * GET home page.
 */

exports.get = function(req, res){
  res.render('index', { title: 'Express' });
};