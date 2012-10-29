//parse mibs into JSON objects for easy handling
//add in import constructor
//search for imports
//TODO: change to import filename

//var jquery = require('jquery');


var mibtojson = (function(){
	var json = {};
	function removeComments(mib){
		var reComment = /[-]{2}.*$/gm,
			i;

		if(typeof mib === 'undefined'){
			return {};
		}
		mib =mib.replace(reComment,'');
		return mib;
	}
	function toJson(mib){
		//TODO Parse stuff
		mib = removeComments(mib);
		return mib;
	}
	return {

		parse: function(mib){
			json = toJson(mib);
			return json; }
	};
}());

exports.mibtojson = mibtojson;