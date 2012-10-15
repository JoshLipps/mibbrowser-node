
/*
 * GET home page.
 */
 
var bodystuff = 
'<input type="file" id="files" name="file" />\n'+
'<div><output id="list"> </output><div>';

var scripts = 
'<script src="/js/getFile.js"></script>\n' +
'<script src="/js/mib-to-json.js"></script>';

exports.index = function(req, res){
  res.render('index', { 
  	title: 'Upload a MIB ...',
  	script:scripts,
	body: bodystuff
	});
};