
//
// GET Import Page
//
$ = require('jquery');

var bodystuff =
'<div class="hero-unit">\n'+
'<h2>About</h2>\n'+
'<p>We like MIBs and Node. Here\'s a list of tech used to generate this goodness:</p>\n'+
'<ul>\n'+
'<li>\n'+
["node.js","express","ejs","vows","initializr","GitHub","jQuery"].join('</li>\n<li>')+
'</li>'+
'</ul></div>';


var scripts = '';

exports.index = function(req, res){
  res.render('index', {
	title: 'About',
	script: scripts,
	body: bodystuff
	});
};
