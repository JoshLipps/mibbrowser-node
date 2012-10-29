
/*
 * GET home page.
 */
var bodystuff,scripts;



bodystuff =
'<div class="inputbox-list well"><ul>\n'+
' 	<li><label for="host">Host</label></li>\n'+
'	<li><input class="input-small" type="text" id="host" name="host" value="snmp.yawnneko.com" /></li>\n'+
'</ul>\n'+
'<ul>\n'+
'	<li><label for="community">Community</label></li>\n'+
'	<li><input class="input-small" type="text" id="community" name="community" value="cs158b!" /></li>\n'+
'</ul>\n'+
'<ul>\n'+
'	<li><label for="oid">OID</label></li>\n'+
'	<li><input class="input-small" type="text" id="oid" name="oid" value=".1.3.6.1.2.1.1.3.0" /></li>\n'+
'</ul>\n'+
'<input class="btn" type="submit" value="Poll" onclick="toGetAPI()" />\n'+
'</div>\n'+
'<div><input type="file" id="files" name="file" />\n'+
'	<div class="input-append">\n' +
'		<input id="mibfile" class="input" type="text">\n'+
'		<a class="btn" onclick="$(\'input[id=files]\').click();">Browse</a>\n'+
'	</div>\n'+
'</div>\n'+
'<div><output id="list"> </output></div>';

scripts =
'<script src="/js/main.js"></script>\n' +
'<script src="/js/mib-to-json.js"></script>';

exports.index = function(req, res){
  res.render('index', {
	title: 'Node MIB Browser',
	script:scripts,
	body: bodystuff
	});
};