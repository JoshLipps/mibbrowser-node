
//
// GET Devices Page
// this should print all devices stored in the DB server and provide for adding new devices
//

var bodystuff ='<div class="container-fluid">\n'+
'  <div class="row-fluid">\n'+
'    <div class="span3 bs-docs-sidebar">\n'+
'        <!--Sidebar content-->\n'+
'        <ul class="nav nav-list bs-docs-sidenav affix-top">\n'+
'            <li class="active"><a href="#snmp">snmp.yawnneko.com<i class="icon-chevron-right"></i></a> </li>\n'+
'            <li class=""><a href="#loki"> loki.yawnneko.com<i class="icon-chevron-right"></i></a> </li>\n'+
'            <li class=""><a href="#openwrt">openwrt.yawnneko.com<i class="icon-chevron-right"></i></a></li>\n'+
'       </ul>\n'+
'    </div>\n'+
'    <div class="span9"><div class="well">\n'+
'      <!--Body content-->\n'+
'        Item 1<br>\n'+
'        Item 2<br>\n'+
'        Graph<br>\n'+
'    </div>\n'+
'<div class="well"><table class="table table-hover table-condensed">\n' +
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
'   </tbody>\n'+
'</table>\n'+
'    </div>\n'+
'    </div>\n'+
'  </div>\n'+
'</div>';


var scripts = '';

exports.index = function(req, res){
  res.render('index', {
    title: 'NMS Devices',
    script: scripts,
    body: bodystuff
    });
};
