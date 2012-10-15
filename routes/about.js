
//
// GET Import Page
//
var bodystuff = 
'<h1> About </h1>\n'+
'<p>We like MIBs and Node. Here\'s a list of tech used to generate this goodness:</p>\n'+
'<ul>\n'+
["<li>","node.js","express","ejs","vows","initializr","GitHub","jQuery","</li>"].join('</li><li>') 
+'</ul>';


var scripts = '';

exports.index = function(req, res){
  res.render('index', { 
  	title: 'About',
  	script: scripts,
	body: bodystuff
	});
};
