
//
// GET Import Page
//
//$ = require('jquery');

var bodystuff = '',scripts = '',css = '<link rel="stylesheet" href="css/about.css" />';


exports.index = function(req, res){
  res.render('about', {
	title: 'About',
	script: scripts,
	body: bodystuff,
	css: css
	});
};
