var oid = require('../public/js/oids.js').objectID,
jsonArray = [
        //{'name' : 'iso(1)','parent' : '', 'oid' : '1'},
        //{'name' : 'org(3)','parent' : 'iso\\(1\\)', 'oid' : '1.3'},
        {'name' : 'dod(6)',  'parent' : 'org\\(3\\)', 'oid' : '1.3.6'},
        {'name' : 'internet(1)',  'parent' : 'dod\\(6\\)', 'oid' : '1.3.6.1'},
        {'name' : 'mgmt(2)',  'parent' : 'internet\\(1\\)', 'oid' : '1.3.6.1.2'},
        {'name' : 'mib-2(1)',  'parent' : 'mgmt\\(2\\)', 'oid' : '1.3.6.1.2.1'},
        {'name' : 'system(1)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.1'},
        {'name' : 'sysDescr(1)',  'parent' : 'system\\(1\\)', 'oid' : '1.3.6.1.2.1.1.1'},
        {'name' : 'sysObjectID(2)',  'parent' : 'system\\(1\\)', 'oid' : '1.3.6.1.2.1.1.2'},
        {'name' : 'sysUpTime(3)',  'parent' : 'system\\(1\\)', 'oid' : '1.3.6.1.2.1.1.3'},
        {'name' : 'sysContact(4)',  'parent' : 'system\\(1\\)', 'oid' : '1.3.6.1.2.1.1.4'},
        {'name' : 'sysName(5)',  'parent' : 'system\\(1\\)', 'oid' : '1.3.6.1.2.1.1.5'},
        {'name' : 'sysLocation(6)',  'parent' : 'system\\(1\\)', 'oid' : '1.3.6.1.2.1.1.6'},
        {'name' : 'sysServices(7)',  'parent' : 'system\\(1\\)', 'oid' : '1.3.6.1.2.1.1.7'},
        {'name' : 'interface(2)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.2'},
        {'name' : 'ifNumber(1)',  'parent' : 'interface\\(2\\)', 'oid' : '1.3.6.1.2.1.2.1'},
        {'name' : 'ifTable(2)',  'parent' : 'interface\\(2\\)', 'oid' : '1.3.6.1.2.1.2.2'},
        {'name' : 'at(3)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.3'},
        {'name' : 'atTable(1)',  'parent' : 'at\\(3\\)', 'oid' : '1.3.6.1.2.1.3.1'},
        {'name' : 'ip(4)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.4'},
        {'name' : 'ipForwarding(1)',  'parent' : 'ip\\(4\\)', 'oid' : '1.3.6.1.2.1.4.1'},
        {'name' : 'ipDefaultTTL(2)',  'parent' : 'ip\\(4\\)', 'oid' : '1.3.6.1.2.1.4.2'},
        {'name' : 'ipInReceives(3)',  'parent' : 'ip\\(4\\)', 'oid' : '1.3.6.1.2.1.4.3'},
        {'name' : 'icmp(5)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.5'},
        {'name' : 'icmpInMsgs(1)',  'parent' : 'icmp\\(5\\)', 'oid' : '1.3.6.1.2.1.5.1'},
        {'name' : 'icmpInErrors(2)',  'parent' : 'icmp\\(5\\)', 'oid' : '1.3.6.1.2.1.5.2'},
        {'name' : 'icmpInDestUnreachs(3)',  'parent' : 'icmp\\(5\\)', 'oid' : '1.3.6.1.2.1.5.3'},
        {'name' : 'tcp(6)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.6'},
        {'name' : 'tcpRtoAlgorithm(1)',  'parent' : 'tcp\\(6\\)', 'oid' : '1.3.6.1.2.1.6.1'},
        {'name' : 'tcpRtoMin(2)',  'parent' : 'tcp\\(6\\)', 'oid' : '1.3.6.1.2.1.6.2'},
        {'name' : 'tcpRtoMax(3)',  'parent' : 'tcp\\(6\\)', 'oid' : '1.3.6.1.2.1.6.3'},
        {'name' : 'udp(7)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.7'},
        {'name' : 'udpInDatagrams(1)',  'parent' : 'udp\\(7\\)', 'oid' : '1.3.6.1.2.1.7.1'},
        {'name' : 'udpNoPorts(2)',  'parent' : 'udp\\(7\\)', 'oid' : '1.3.6.1.2.1.7.2'},
        {'name' : 'udpInErrors(3)',  'parent' : 'udp\\(7\\)', 'oid' : '1.3.6.1.2.1.7.3'},
        {'name' : 'udpOutDatagrams(4)',  'parent' : 'udp\\(7\\)', 'oid' : '1.3.6.1.2.1.7.4'},
        {'name' : 'udpTable(5)',  'parent' : 'udp\\(7\\)', 'oid' : '1.3.6.1.2.1.7.5'},
        {'name' : 'egp(8)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.8'},
        {'name' : 'egpegpInMsgs(1)',  'parent' : 'egp\\(8\\)', 'oid' : '1.3.6.1.2.1.8.1'},
        {'name' : 'egpInErrors(2)',  'parent' : 'egp\\(8\\)', 'oid' : '1.3.6.1.2.1.8.2'},
        {'name' : 'egpOutMsgs(3)',  'parent' : 'egp\\(8\\)', 'oid' : '1.3.6.1.2.1.8.3'},
        {'name' : 'cmot(9)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.9'},
        {'name' : 'transmission(10)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.10'},
        {'name' : 'Definitions of Managed Objects for the DS1 and E1 Interface Types(18)',  'parent' : 'transmission\\(10\\)', 'oid' : '1.3.6.1.2.1.10.18'},
        {'name' : 'ISDN transmission MIB(20)',  'parent' : 'transmission\\(10\\)', 'oid' : '1.3.6.1.2.1.10.20'},
        {'name' : 'snmp(11)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.11'},
        {'name' : 'snmpInPkts(1)',  'parent' : 'snmp\\(11\\)', 'oid' : '1.3.6.1.2.1.11.1'},
        {'name' : 'snmpOutPkts(2)',  'parent' : 'snmp\\(11\\)', 'oid' : '1.3.6.1.2.1.11.2'},
        {'name' : 'snmpInBadVersions(3)',  'parent' : 'snmp\\(11\\)', 'oid' : '1.3.6.1.2.1.11.3'},
        {'name' : 'rmon(16)',  'parent' : 'mib-2\\(1\\)', 'oid' : '1.3.6.1.2.1.16'},
        {'name' : 'statistics(1)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.1'},
        {'name' : 'history(2)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.2'},
        {'name' : 'alarm(3)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.3'},
        {'name' : 'hosts(4)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.4'},
        {'name' : 'hostTopN(5)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.5'},
        {'name' : 'matrix(6)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.6'},
        {'name' : 'filter(7)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.7'},
        {'name' : 'capture(8)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.8'},
        {'name' : 'event(9)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.9'},
        {'name' : 'tokenRing(10)',  'parent' : 'rmon\\(16\\)', 'oid' : '1.3.6.1.2.1.16.10'}
    ];

function getroot(){
    //iso(1) identified-organization(3)
    var root = new oid("iso(1)","1");
    root.addaChild(new oid("identified-organization(3)","1.3"));
    return root;
}

var root = getroot();

jsonArray.forEach(function(ele,index,array){
    var newchild = new oid(ele.name,ele.oid);
    root.addaChild(newchild);
});
//root.print();
console.log(JSON.stringify(root));
