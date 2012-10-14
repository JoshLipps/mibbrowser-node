mibbrowser-node
===============

A mib browser written as a node module. This is just for fun and not meant for any productive use other than it's instructive nature to the authors. Use at your own risk. 

Objective
---------
To develop an SNMP MIB-II browser, including a friendly graphic user interface.

Requirements

	All the MIB groups below mib-2, from system, interfaces, ip, to snmp;
	Another MIB group that is beyond the basic 11 groups under mib-2.
	GUI - The program should include some GUI of your choice. It should allow users to easily access any object or any subtree of the portion of MIB-II you supported. It should provide the full picture, and icons represent each branch/subtree. Clicking an icon will bring users to the full picture of the branch/subtree, and so on. Users should be given the option of seeing a certain branch, table, row, or leave.
	SNMP Commands - The program could use either snmp mib class you downloaded, or snmp commands available in your own system:
	snmpstatus, snmpnetstat, snmptest, snmpwalk, snmpget, snmptranslate

	http://rfc.activedomain.org/1000-1499/rfc1213.html - MIB-IIv2 RFC 1213


***TODO
	1. Input MIB (upload/yes/no)
	2. Parse MIB to JSON
	3. Display MIB - ext-js
	4. Pretify Displyed MIB
	5. Net-SNMP support


 * express - web application framework for node
 * ejs     - node.js templating engine
 * jquery  - jquery ...
 * jqueryui - whynot fun/pretty wigits

Install
-------
    git clone git://github.com/YeshuaDrake/mibbrowser-node.git
    cd mibbrowser-node
    npm install

TODO
----
1. Input MIB (upload/yes/no)
2. Parse MIB to JSON
3. Display MIB
4. Pretify Displyed MIB
5. Net-SNMP support
