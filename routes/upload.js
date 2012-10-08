
/*
 * GET home page.
 */

exports.import = function(req, res){
  res.render('index', { title: 'Upload a MIB ...' });
};
