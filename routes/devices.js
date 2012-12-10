
//
// GET Devices Page
// this should print all devices stored in the DB server and provide for adding new devices
//

var bodystuff ='',scripts = '<script src="/js/alarmsFront.js"></script>',css = '<link rel="stylesheet" href="css/devices.css" />',forms;

forms=["hostname","community","port"];

exports.index = function(req, res){
	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    	if(!err) { console.log("We are connected"); }
    	db.collection("mb.devices").find({},{hostname:1}).toArray(function(err, devices) {
	    	if(err) { console.log("Devices not returned"); }
    		//console.log(devices);
    		db.collection("mb.events").find({device:devices[0].hostname}).toArray(function(err, events) {
	    		if(err) { console.log("Events not returned"); }
				res.render('devices', {
					title: 'NMS Devices',
					script: scripts,
					body: bodystuff,
					css: css,
					devices:devices,
					events:events,
					forms:forms
				});
			});
  		});
    });
};
