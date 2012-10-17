//parse mibs into JSON objects for easy handling
//add in import constructor
//search for imports
//TODO: change to import filename

//var jquery = require('jquery');

var mibtojson = (function(){
	var json = {};
	function removeComments(mib){
		var reComment = /-{2}.*$/
		,	i;

		if(typeof mib === 'undefined'){
			return {};
		}
			
		for(i=0;i<mib.length;i++){
			mib[i] = mib[i].replace(reComment);
			//TODO remove while line in case of full line comment
		}
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
			return JSON.stringify(json); }
	};
}());

exports.mibtojson = mibtojson;