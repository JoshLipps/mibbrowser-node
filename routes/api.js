
/*
 * GET home page.
 */
 var snmp = require('snmp-native');
 
exports.snmpget = function(req, res){

    var session;

    session = new snmp.Session({ host: req.query.host, port: 161, community: req.query.community });
    
    session.get({ oid: req.query.odi}, function (error, varbind) {
        if (error) {
            console.log('Fail :(');
        } else {
            res.send(varbind.oid + ' = ' + varbind.value + ' (' + varbind.type + ')');
        }
});
    console.log(req.query);
    
};