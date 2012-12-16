//This contains backend polling code
//should it be called pollHandler? ...rofl
var snmp = require('snmp-native'),
    db = require('../backend/mongoConn.js');
    //mongoConn = require('../backend/mongoConn.js'),
    //db = mongoConn(process.env.MONGOLAB_URI);

exports.go = function(){
    //for device collection poll and dump response in history collection
    //find all oids on devices to be polled
    db("mb.devices", function(err, devices){
        if(err) console.log("Poll - Device collection: " + err);
        devices.find().each(function(err,device) {
            if(err) console.log("poll.find error: " + err);
            if(device){
                //poll each alarm
                device.alarms.forEach(function(alarm,index,alarms){
                    //poll Oid
                    snmps(device.hostname,device.port,device.community,'get',alarm.oid,function(value){
                        logHistory(device.hostname,alarm.oid,Number(value));
                        eventCheck(device,alarm.oid,Number(value));

                    });
                });
            }
        });
    });
};


function updateState(name,oid,state){
    console.log("Update State"+JSON.stringify(name));
    //var MongoClient = require('mongodb').MongoClient;
    //MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    db('mb.devices', function(err, devices){
        if(err) console.log("updateStatus error: " + err);
        devices.update({hostname:name.hostname}, name, {w:1}, function(){
            console.log(name.hostname + " updated.");
        });
    });  


}
function createEvent(name,oid,state,msg){
  //  console.log("createEvent");
    //var MongoClient = require('mongodb').MongoClient;
    //MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    var time = new Date();
    db('mb.events', function(err, events){
        if(err) console.log("createEvent error: " + err);
        events.insert({device:name,alarmname:oid,state:state,description:msg,datestamp:time}, function(){
            console.log("Event for " + name + ", " + oid + " created.");
        });
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
                createEvent(host.hostname,oid,'warning',host.alarms[i].warnmsg);
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
    //var MongoClient = require('mongodb').MongoClient;
    //insert unsorted poll data to history collection
    //MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    //if(err){console.log("logHistory db fail")} 
    //else{
    db('mb.history', function(err, history){
        if(err) console.log("logHistory error: " + err);
        history.insert({hostname:name,oid:oid,date:time.getTime(),response:value},{w:1},function(){
            console.log("logHistory: event added for " + name + ":" + oid + ":" + value + ".");
        });
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
                console.log('Fail :( error:'+error+" Host: "+host); // lawl
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
