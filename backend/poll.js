//This contains backend polling code
//should it be called pollHandler? ...rofl
var snmp = require('snmp-native');

exports.go = function(){
    //for poll collection poll and dump response in history collection
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        if(err) { console.log("DB connection error - polling"); }
        else{

            //find all devices to be polled
            db.collection("mb.poll").find({},{}).each(function(err,poll) {
                var BSON= require('mongodb').BSONPure,obj_id;
                if(err) { console.log("DB connection error - find(poll)"); }
                if(poll){
                    //console.log(poll.deviceID);
                    obj_id = BSON.ObjectID.createFromHexString(poll.deviceID);
                    
                    //grab device from device table
                    db.collection("mb.devices").findOne(obj_id,function(err,device){
                        //poll device
                        snmps(device.hostname,device.port,device.community,'get',poll.oid,function(value){
                            //console.log(value);
                            logHistory(device.hostname,poll.oid,value);
                            eventCheck(device,poll.oid,value);
                        })
                    })
                } else{
                //db.close();
                }
            });
        }
        
    });
    //check for event conditions

};


function updateState(name,oid,state){
    console.log("Update State"+JSON.stringify(name));
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        db.collection('mb.devices').update({hostname:name.hostname},name,{w:1},function(){db.close()});
    });  


}
function createEvent(name,oid,state,msg){
  //  console.log("createEvent");
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        var time = new Date();
        db.collection('mb.events').insert({device:name,alarmname:oid,state:state,description:msg,datestamp:time},function(){db.close()});
    });
}

//checks to see if this event requires new event
function eventCheck(host,oid,value){
    //var time = new Date();
    //console.log({hostname:name});
                //console.log();
    for(var i=0;i<host.alarms.length;i++){
        if(oid===host.alarms[i].oid){
            //console.log("Event Check - Oid found ");
            if(value<host.alarms[i].error)
            {
                createEvent(host.hostname,oid,'error',host.alarms[i].errormsg);
                host.alarms[i].state = "error";
                updateState(host,oid,"error");
            }else if(value<host.alarms[i].warn){
                createEvent(host.hostname,oid,'warn',host.alarms[i].warnmsg);
                host.alarms[i].state = "warn";
                updateState(host,oid,"warn");
            }
            else if(value>host.alarms[i].clear && host.alarms[i].state!=="clear"){
                createEvent(host.hostname,oid,'success',host.alarms[i].clearmsg);
                host.alarms[i].state = "clear";
                updateState(host,oid,"clear");
            }
    
        }
    }
}

function logHistory(name,oid,value){
    var time = new Date();
    var MongoClient = require('mongodb').MongoClient;
    //insert unsorted poll data to history collection
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    if(err){console.log("logHistory db fail")} 
    else{
        db.collection('mb.history').insert({hostname:name,oid:oid,date:time.getTime(),response:value},{w:1},function(){db.close()});
    }
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
