
/*
 * GET home page.
 */
var bodystuff,scripts;



bodystuff =
'<div class="inputbox-list well">'+
'<div>\n'+
' 	<label for="host">Host</label>\n'+
'	<input class="input" type="text" id="host" name="host" value="snmp.yawnneko.com" />\n'+
'</div>\n'+
'<div>\n'+
'	<label for="community">Community</label>\n'+
'	<input class="input-small" type="text" id="community" name="community" value="cs158b!" />\n'+
'</div>\n'+
'<div>\n'+
'	<label for="oid">OID</label>\n'+
'	<input class="input" type="text" id="oid" name="oid" value=".1.3.6.1.2.1.1.3.0" />\n'+
'</div>\n'+
'<div>\n'+
'	<label for="poll">Poll</label>\n'+
'	<input class="btn" type="submit" value="Get" onclick="toGetAPI()" />\n'+
'</div>\n'+
'</div>\n'+
'<div class="filebox well"><input type="file" id="files" name="file" />\n'+
'	<div class="input-append">\n' +
'		<input id="mibfile" class="input" type="text">\n'+
'		<a class="btn" onclick="$(\'input[id=files]\').click();">Browse</a>\n'+
'	</div>\n'+
'	<div class="list"><output id="list"> </output></div>'+
'</div>\n';
;

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