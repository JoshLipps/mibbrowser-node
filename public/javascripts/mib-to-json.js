//parse mibs into JSON objects for easy handling

var mibtojson = (function(){
	var json = {};
	return {
		parse: function(str){
			return JSON.stringify(json); }
	};
}());

exports.mibtojson = mibtojson;