
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
    
    session.get({oid: requestedOid}, function (error, varbind) {
        var vb = varbind[0];
        if (error) {
            console.log('Fail :('); // lawl
        } else {
            res.send(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
            console.log('The system uptime is "' + vb.value + '" (oid: ' + vb.oid + ')');
        }
    });

    // The session must be closed when you're done with it.
    //session.close();
    
};
exports.mib2 = function(req,res){
    res.send(mib2);
};