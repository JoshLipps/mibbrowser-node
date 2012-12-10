//This contains backend polling code
//should it be called pollHandler? ...rofl
var snmp = require('snmp-native');

exports.go = function(){
    //for poll collection poll and dump response in history collection
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        if(err) { console.log("DB connection error - polling"); }
        db.collection("mb.poll").find({},{}).each(function(err,poll) {
            var BSON= require('mongodb').BSONPure,obj_id;
            if(err) { console.log("DB connection error - polling"); }
            if(poll){
                //console.log(poll.deviceID);
                obj_id = BSON.ObjectID.createFromHexString(poll.deviceID);
                db.collection("mb.devices").findOne(obj_id,function(err,device){

                    snmps(device.hostname,device.port,device.community,'get',poll.oid,function(value){
                        console.log(value);
                    })
                })
            } else{
                //snmpget();
                    //pollitem.
            //}
            //db.close();
            }
        });
        
    });
    //check for event conditions

};
//function event(){}
//exports.snmp = snmps;
var  snmps = function(host,port,community,action,requestedOid,callback){

    //add input validation PLEASE.
    var session = new snmp.Session({ host: host, port: port, community: 'cs158b!' });
    if(action ==="get"){
        session.get({oid: requestedOid}, function (error, varbind) {
            if (error) {
                console.log('Fail :('); // lawl
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