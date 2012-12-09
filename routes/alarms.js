
//
// GET Import Page
//

//Example tab= require('jquery');

//TODO pull this info from mongoDB
var bodystuff = '',scripts = '', css = '<link rel="stylesheet" href="css/alarms.css" />',events;
//var jquery = require('jquery');

//jquery(get)


exports.index = function(req, res){
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    if(!err) { console.log("We are connected"); }
    db.collection("mb.events").find({},{}).toArray(function(err, events) {
    if(!err) { console.log("Events returned"); }
            res.render('alarms', {
                title: 'NMS Alarms',
                script: scripts,
                body: bodystuff,
                css: css,
                events: events
            });
            db.close();
        });
    });
};
