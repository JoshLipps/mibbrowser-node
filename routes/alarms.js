
//
// GET Alarms Page
//

//var mongoConn = require('../backend/mongoConn.js'),
//    db = mongoConn(process.env.MONGOLAB_URI);
var db = require('../backend/mongoConn.js');

//TODO pull this info from mongoDB
var bodystuff = '',scripts = '<script src="js/alarms.js"></script>', css = '<link rel="stylesheet" href="css/alarms.css" />',events;
//var jquery = require('jquery');

//jquery(get)


exports.index = function(req, res){
    db("mb.events", function(err, events){
        if(err) console.log("Alarms page error: " + err);
        events.find({},{sort:{datestamp:-1}}).toArray(function(err, events) {
            if(err) console.log("Events not returned: " + err); 
            else {
                res.render('alarms', {
                    title: 'NMS Alarms',
                    script: scripts,
                    body: bodystuff,
                    css: css,
                    events: events
                });
            }
        });
    });
};
