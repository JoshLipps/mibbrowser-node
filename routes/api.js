
/*
 * GET home page.
 */
 var snmp = require('snmp-native');
 
exports.snmpget = function(req, res){

    console.log(req.query);
    var session,
    requestedOid = req.query.oid;
    //Commented out because we are spliting but lib can do this for us.
    //var requestedOid = req.query.oid.split(/\./g);
    //requestedOid.shift();

    console.log("requestedOid: " + requestedOid);

    session = new snmp.Session({ host: req.query.host, port: 161, community: req.query.community });
    //session = new snmp.Session({ host: "snmp.yawnneko.com", port: 161, community: "cs158b!" });
    
    // TODO: Make this work!
    //session.get({ oid: requestedOid }, function (error, varbind) {
    session.get({ oid: requestedOid}, function (error, varbind) {
        var vb = varbind[0];
        if (error) {
            console.log('Fail :('); // lawl
        } else {
            res.send(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
            console.log('The system uptime is "' + vb.value + '"');
        }
    });

    // The session must be closed when you're done with it.
    //session.close();
    
};
