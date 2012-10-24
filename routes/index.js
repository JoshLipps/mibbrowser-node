
/*
 * GET home page.
 */
 
var bodystuff =
'<label for="host">Host</label><input type="text" id="host" name="host" value="snmp.yawnneko.com" />\n'+
'<label for="community">Community</label><input type="text" id="community" name="community" value="cs158b!" />\n'+
'<br />'+
'<label for="oid">OID</label><input type="text" id="oid" name="oid" value=".1.3.6.1.2.1.1.3.0" />\n'+
'<input type="submit" value="Poll" onclick="toGetAPI()"/>'+
'<input type="file" id="files" name="file" />\n'+
'<div><output id="list"> </output></div>';

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