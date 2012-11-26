
//
// GET Import Page
//
//$ = require('jquery');

var bodystuff = '';


var scripts = '';

exports.index = function(req, res){
  res.render('about', {
	title: 'About',
	script: scripts,
	body: bodystuff
	});
};
