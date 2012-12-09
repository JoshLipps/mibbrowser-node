
//
// GET Import Page
//
//$ = require('jquery');

var bodystuff = '',scripts = '',css = '';


exports.index = function(req, res){
  res.render('about', {
	title: 'About',
	script: scripts,
	body: bodystuff,
	css: css
	});
};
