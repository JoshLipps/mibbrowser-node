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

		mib = mib.replace(reComment,'');
		return mib;
	}
	function toJson(mib){
		//TODO Parse stuff
		var regexp = /[\}\;]$/mg, i,name;
		
		if(typeof mib === 'undefined'){
			return {};
		}

		mib = removeComments(mib);
		mib = mib.split(regexp);
		for (i=1;i<mib.length;i++){
			mib[i] = mib[i].split(" ")[0].replace(/[\r\s]/gm,'');
			//mib[i]		
		}
		console.log(mib);
		return mib;
	}
	/*
	oid object definition
	{
		name:"",
		type:"",
		oid:"",
		attrArray:[],
		children:[]
	}
	*/
	return {

		parse: function(mib){
			json = toJson(mib);
			return json; }
	};
}());

exports.mibtojson = mibtojson;