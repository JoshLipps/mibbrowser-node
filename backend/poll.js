//This contains backend polling code
//should it be called pollHandler? ...rofl
exports.go = function(){
	//for poll collection poll and dump response in history collection
	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        if(err) { console.log("DB connection error polling"); }
        db.collection("mb.poll").find({},{}).toArray(function(err, docs) {
                
                db.close();
        });
    });
	//check for event conditions

};
function event(){}