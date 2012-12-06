
/*
 * GET home page.
 */
 var snmp = require('snmp-native'),
 mib2 = require('./mib2');
exports.snmpget = function(req, res){

    console.log(req.query);
    var session,
    requestedOid = req.query.oid;

    //console.log("requestedOid: " + requestedOid);

    session = new snmp.Session({ host: req.query.host, port: 161, community: req.query.community });
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

exports.getHosts = function(req,res) {
    var hosts;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
        if(!err) { console.log("We are connected"); }
        hosts = db.mb.devices.find({}, { hostname: 1});
    });
    console.log(hosts);
};