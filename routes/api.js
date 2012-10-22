
/*
 * GET home page.
 */
 var snmp = require('snmp-native');
 
exports.snmpget = function(req, res){

    var session;

    session = new snmp.Session({ host: req.query.host, port: 161, community: req.query.community });
    //session = new snmp.Session({ host: "snmp.yawnneko.com", port: 161, community: "cs158b!" });
    
    session.get({ oid: [1,3,6,1,2,1,1,3,0]}, function (error, varbind) {
        var vb = varbind[0];
        if (error) {
            console.log('Fail :(');
        } else {
            res.send(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
            console.log('The system uptime is "' + vb.value + '"');
        }
    });

    // The session must be closed when you're done with it.
    //session.close();
    //console.log(req.query);
    
};