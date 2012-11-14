
//
// GET Import Page
//

//Example table
//TODO pull this info from mongoDB
var bodystuff =
'<table class="table table-hover table-condensed">\n' +
'   <thead>\n'+
'       <tr class="success">\n'+
'           <td>Device</td>\n'+
'           <td>Alarm Name</td>\n'+
'           <td>State</td>\n'+
'           <td>Error Description</td>\n'+
'       </tr>\n'+
'   </thead>\n'+
'   <tbody>\n'+
'       <tr class="success">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Clear</td>\n'+
'           <td>Uptime is &gt3 Minutes</td>\n'+
'       <tr class="warning">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Warning</td>\n'+
'           <td>Uptime is &gt1 Minute</td>\n'+
'       <tr class="error">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Error</td>\n'+
'           <td>Uptime is &lt1 Minute</td>\n'+
'       <tr class="success">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Clear</td>\n'+
'           <td>Uptime is &gt3 Minutes</td>\n'+
'       <tr class="warning">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Warning</td>\n'+
'           <td>Uptime is &gt1 Minute</td>\n'+
'       <tr class="error">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Error</td>\n'+
'           <td>Uptime is &lt1 Minute</td>\n'+
'       <tr class="success">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Clear</td>\n'+
'           <td>Uptime is &gt3 Minutes</td>\n'+
'       <tr class="warning">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Warning</td>\n'+
'           <td>Uptime is &gt1 Minute</td>\n'+
'       <tr class="error">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Error</td>\n'+
'           <td>Uptime is &lt1 Minute</td>\n'+
'       <tr class="success">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Clear</td>\n'+
'           <td>Uptime is &gt3 Minutes</td>\n'+
'       <tr class="warning">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Warning</td>\n'+
'           <td>Uptime is &gt1 Minute</td>\n'+
'       <tr class="error">\n'+
'           <td>snmp.yawnneko.com</td>\n'+
'           <td>Uptime</td>\n'+
'           <td>Error</td>\n'+
'           <td>Uptime is &lt1 Minute</td>\n'+
'       </tr>\n'+
'   </tbody>\n'+
'</table>\n';


var scripts = '';

exports.index = function(req, res){
  res.render('index', {
    title: 'NMS Alarms',
    script: scripts,
    body: bodystuff
    });
};
