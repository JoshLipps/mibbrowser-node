//This contains backend polling code
//should it be called pollHandler? ...rofl
var snmp = require('snmp-native');

exports.go = function(){
    //for poll collection poll and dump response in history collection
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        if(err) { console.log("DB connection error - polling"); }
        db.collection("mb.poll").find({},{}).toArray( function(pollArray) {
            var i=0;
            for (i=0;i<)
            console.log(pollitem);
            console.log(db.collection("mb.devices").findOne({"_id":pollitem.deviceId},{}));
            //snmpget();
                //pollitem.
            db.close();
        });
        
    });
    //check for event conditions

};
function event(){}

exports.snmp = function(host,port,community,action,requestedOid,callback){

    var session = new snmp.Session({ host: host, port: port, community: community });
    if(action ==="get"){

        session.get({oid: requestedOid}, function (error, varbind) {
            var vb = varbind[0];
            if (error) {
                console.log('Fail :('); // lawl
            } else {
                callback(vb.value);
            }
            session.close();
        });
    }
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
    }
    // The session must be closed when you're done with it.
    //session.close();
    
};