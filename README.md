mibbrowser-node
===============

A mib browser written as a node module. This is just for fun and not meant for any productive use other than it's instructive nature to the authors. Use at your own risk. 

Objective
---------
To develop an SNMP MIB-II browser, including a friendly graphic user interface.

Requirements
------------

	All the MIB groups below mib-2, from system, interfaces, ip, to snmp;
	Another MIB group that is beyond the basic 11 groups under mib-2.
	GUI - The program should include some GUI of your choice. It should allow users to easily access any object or any subtree of the portion of MIB-II you supported. It should provide the full picture, and icons represent each branch/subtree. Clicking an icon will bring users to the full picture of the branch /subtree, and so on. Users should be given the option of seeing a certain branch, table, row, or leave.
	SNMP Commands - The program could use either snmp mib class you downloaded, or snmp commands available in your own system:
	snmpstatus, snmpnetstat, snmptest, snmpwalk, snmpget, snmptranslate
	http://rfc.activedomain.org/1000-1499/rfc1213.html - MIB-IIv2 RFC 1213

Cool things used:
----------------
 * express		- 	web application framework for node
 * ejs			-	node.js templating engine
 * vows			-	UnitTest framework(barely)
 * jquery		-	jQuery ... 
 * bootstrap	-	make it pretty

Install
-------
   fixthis



TODO
----
HIGH:
* Add custom OID in device config
* Another device using the UCD mib

Med:
* Alarms/devices page - Live Update
* DB - types/names for oids
* Remove a Device
* Browser page - Add ucdavis mib 
* When removing oids clean history and events
* Delete events?

Low:
* Graphs - Click zooming in and out(date filter on api call)
* Devices page - Configure a Graph  
* Alarms page - Add filter(sorta done with link)
* Store datestamps in mb.history as Date().

snmptranslate -Tz -m UCD-SNMP-MIB::ucdavis |awk -e '{ print $2 "\t" $1}' |sed s/\"//g

DONE
----
* Label Graphs with name, Get rid of stupid shit on graphs, Add visable points 
* Alarms page - links to device page 
* Configure Page -Pre-populated oid selections 
* Refresh alarms page (load new alarms)
