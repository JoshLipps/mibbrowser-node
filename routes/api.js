
/*
 * GET home page.
 */
var snmp = require('snmp-native'),
    mib2 = require('./mib2'),
    db = require('../backend/mongoConn.js');
    //mongoConn = require('../backend/mongoConn.js'),
    //db = mongoConn(process.env.MONGOLAB_URI);

exports.snmpget = function(req, res){

    console.log(req.query);
    var session,
    requestedOid = req.query.oid;

    //console.log("requestedOid: " + requestedOid);

    session = new snmp.Session({ host: req.query.host, port: req.query.port, community: req.query.community });
    if(req.query.action =="get"){

        session.get({oid: requestedOid}, function (error, varbind) {
            var vb = varbind[0];
            if (error) {
                console.log('Fail :('); // lawl
            } else {
                res.send(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
                console.log('The system response is "' + vb.value + '" (oid: ' + vb.oid + ')');
            }
        });
    }
    else if(req.query.action =="getnext"){
        session.getNext({oid: requestedOid}, function (error, varbind) {
            var vb = varbind[0];
            if (error) {
                console.log('Fail :('); // lawl
            } else {
                res.send(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
                console.log('The system response is  "' + vb.value + '" (oid: ' + vb.oid + ')');
            }
        });
    }
     else if(req.query.action =="getsubtree"){
        session.getSubtree({oid: requestedOid}, function (error, varbind) {
            var response ="";
            if (error) {
                console.log('Fail :('); // lawl
            } else {
                varbind.forEach(function (vb) {

                    response += '<p>'+ vb.oid + ' = ' + vb.value + ' (' + vb.type + ')'+'</p>';
                    console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
                });
                res.send(response);
            }
        });
        
    }
    else{
        res.send("Oid is "+ requestedOid);
    }
    // The session must be closed when you're done with it.
    //session.close();
    
};
exports.mib2 = function(req,res){
    res.send(mib2);
};
exports.postHost = function(req, res) {
    var device = req.body;
    //console.log(device);
    db('mb.devices', function(err, devices){
        var deviceUpdate = {$set:device};
        if(err) console.log("postHost error: " + err);
        devices.findOne({hostname:device.hostname},function(err,host){
            if(err){console.log("Error finding exsisting host during PostHost");}
            //console.log(host);
            if(!host){
                devices.insert(device,{safe:true}, function(err, result){
                    console.log(device.hostname + " Inserted. "+result+" Device Inserted");
                    res.send(device.hostname + " updated "+result+" Device Inserted");
                });
            } else{
                devices.update({hostname:device.hostname}, deviceUpdate,{safe:true}, function(err, result){
                    console.log(device.hostname + " updated. "+result+" Device updated");
                    res.send(device.hostname + " updated "+result+" Device updated");
                });
            }
        
        });
    });  
};
exports.getHost = function(req,res) {
    db("mb.devices", function(err, devices){ 
        if(err) console.log("getHost error: " + err);
        devices.findOne({hostname:req.query.hostname},function(err, host) {
            res.send(host);
        });
    });
};

exports.getEvents = function(req,res) {
    db("mb.events", function(err, events){
        if(err) console.log("getEvents error: " + err);
        events.find({device:req.query.device},{sort:{datestamp:-1}}).toArray(function(err, docs) {
            res.send(docs);
        });
    });
};

exports.getHistory = function(req,res) {
    db("mb.history", function(err, history){
        var ONE_HOUR = 60 * 60 * 1000; /* ms */
        if(err){console.log("getHistory error: " + err);}
        else{
            //console.log(history);
            //history.find().toArray(function(error, docs) { 
            history.find({hostname:req.query.hostname,oid:req.query.oid,date:{ $gt: new Date()-ONE_HOUR}},{fields:{date:1,response:1}}).toArray(function(error, docs) { 
               
                if(err){console.log("getHistory error: " + error);}
                else{
                    //find device so we can add alarms threshold lines
                    db("mb.devices", function(err, devices){ 
                        if(err) console.log("getHistory error: " + err);
                        devices.findOne({hostname:req.query.hostname},function(err, host) {
                            if(err) console.log("getHistory findone error: " + err);
                            host.alarms.forEach(function (alarm,index){
                                var output = [],i,row =[];
                                if(alarm.oid==req.query.oid){
                                    for(i=0;i<docs.length;i++){
                                        //last 3 coloms are for theshold lines
                                        row =[docs[i].date,docs[i].response,Number(alarm.error),Number(alarm.warn),Number(alarm.clear)];
                                        output[i]=row;
                                    }
                                    res.send(output);
                                }
                            });
                        });
                        
                    });
                }
            });
        }
    });
};
exports.ping = function(req, res) {
    res.send("pong");
    console.log("Mark -- Pong");
}

exports.getSupportedOids = function(req, res) {
    db("mb.supportedOids", function(err, supportedOids){
        if(err) console.log("getSupportedOids error: " + err);
        supportedOids.find({},{fields:{"name":1, "oid":1, "_id":0}}).toArray(function(err, oids) {
            res.send(oids);
        });
    });
}
