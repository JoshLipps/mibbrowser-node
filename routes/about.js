
//
// GET Import Page
//
$ = require('jquery');

var bodystuff =
'<p>We like MIBs and Node. Here\'s a list of tech used to generate this goodness:</p>\n'+
'<ul>\n'+
'<li>\n'+
["node.js","express","ejs","vows","initializr","GitHub","jQuery"].join('</li>\n<li>')+
'</li>'+
'</ul>';

//var mylist = ['a','b','c'];

//var list1234 = $('ul.alist');

//$.each(mylist, function(index){
//	$('<li/>').text(mylist[index]).appendTo($('.alist'));
//});

//console.log(list1234.html());

var scripts = '';

exports.index = function(req, res){
  res.render('index', {
	title: 'About',
	script: scripts,
	body: bodystuff
	});
};
