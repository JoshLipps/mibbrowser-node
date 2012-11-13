
/*
 * GET home page.
 */
 var snmp = require('snmp-native');
 
exports.snmpget = function(req, res){

    console.log(req.query);
    var session;

    var requestedOid = req.query.oid.split(/\./);
    requestedOid.shift();

    //console.log("requestedOid: " + requestedOid);

    session = new snmp.Session({ host: req.query.host, port: 161, community: req.query.community });
    
    // TODO: Make this work!
    //session.get({ oid: requestedOid }, function (error, varbind) {
    session.get({ oid: [1,3,6,1,2,1,1,3,0]}, function (error, varbind) {
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
