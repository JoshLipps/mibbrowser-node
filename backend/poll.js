//This contains backend polling code
//should it be called pollHandler? ...rofl
var snmp = require('snmp-native');

exports.go = function(){
    //for poll collection poll and dump response in history collection
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        if(err) { console.log("DB connection error - polling"); }

        //find all devices to be polled
        db.collection("mb.poll").find({},{}).each(function(err,poll) {
            var BSON= require('mongodb').BSONPure,obj_id;
            if(err) { console.log("DB connection error - polling"); }
            if(poll){
                //console.log(poll.deviceID);
                obj_id = BSON.ObjectID.createFromHexString(poll.deviceID);
                
                //grab device from device table
                db.collection("mb.devices").findOne(obj_id,function(err,device){
                    //poll device
                    snmps(device.hostname,device.port,device.community,'get',poll.oid,function(value){
                        //console.log(value);
                        logHistory(device.hostname,poll.oid,value);
                        //eventCheck(value,device,poll.oid);
                    })
                })
            } else{
            //db.close();
            }
        });
        
    });
    //check for event conditions

};

//checks to see if this event requires new event
function eventCheck(name,oid,value){
    var time = new Date();
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        db.collection('mb.history').insert({hostname:name,oid:oid,date:time.getTime()});
    });
}
function logHistory(name,oid,value){
    var time = new Date();
    var MongoClient = require('mongodb').MongoClient;
    //insert unsorted poll data to history collection
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    db.collection('mb.history').insert({hostname:name,oid:oid,date:time.getTime(),response:value},{w:1},function(){db.close()});
    });
}
//exports.snmp = snmps;
var  snmps = function(host,port,community,action,requestedOid,callback){
    //console.log(port);
    //add input validation PLEASE.
    var session = new snmp.Session({ host:host, port:port, community:community});
    if(action ==="get"){
        session.get({oid: requestedOid}, function (error, varbind) {
            if (error) {
                console.log('Fail :( '+host); // lawl
            } else {
                //console.log(varbind[0].value);
                callback(varbind[0].value);
            }
            session.close();
        });
    }
    /*
    else if(action ==="getnext"){
        session.getNext({oid: requestedOid}, function (error, varbind) {
            var vb = varbind[0];
            if (error) {
                console.log('Fail :('); // lawl
            } else {
                callback(vb.value);
            }
            session.close();
        });
    }
     else if(action ==="getsubtree"){
        session.getSubtree({oid: requestedOid}, function (error, varbind) {
            var response ="";
            if (error) {
                console.log('Fail :('); // lawl
            } else {
                varbind.forEach(function (vb) {

                    response += vb.value;
                });
                callback(response);
            }
            session.close();
        });
        
    }
    else{
        callback(requestedOid);
        session.close();
    } */   
};