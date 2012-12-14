
//
// GET Devices Page
// this should print all devices stored in the DB server and provide for adding new devices
//

//var mongoConn = require('../backend/mongoConn.js'),
//db = mongoConn(process.env.MONGOLAB_URI);
var db = require('../backend/mongoConn');

var bodystuff ='',scripts = '<script type="text/javascript" src="https://www.google.com/jsapi"></script>\n'+
'<script type="text/javascript" src="/js/goog.js"></script>\n'+
'<script src="/js/devicefront.js"></script>',css = '<link rel="stylesheet" href="css/devices.css" />\n',forms;

forms=["hostname","community","port"];

exports.index = function(req, res){
    //var MongoClient = require('mongodb').MongoClient;
    //MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    db("mb.devices", function(err, devices){
        if(err) console.log("Devices error: " + err);
        devices.find({},{hostname:1}).toArray(function(err, devices) {
            if(err) console.log("Devices find error: " + err);
            //console.log(devices);
            db("mb.events", function(err, events){
                events.find({device:devices[0].hostname},{sort:{datestamp:-1}}).toArray(function(err, events) {
                    if(err) console.log("Events error: " + err);
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
    });
};
