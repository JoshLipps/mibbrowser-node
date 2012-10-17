
/*
 * GET home page.
 */
 
var bodystuff =
'<label for="host">Host</label><input type="text" id="host" name="host" />\n'+
'<label for="community">Community</label><input type="text" id="community" name="community" />\n'+
'<input type="file" id="files" name="file" />\n'+
'<div><output id="list"> </output><div>';

var scripts =
'<script src="/js/getFile.js"></script>\n' +
'<script src="/js/mib-to-json.js"></script>';

exports.index = function(req, res){
  res.render('index', {
	title: 'Node MIB Browser',
	script:scripts,
	body: bodystuff
	});
};