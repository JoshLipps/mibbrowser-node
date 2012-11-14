
//
// GET Devices Page
// this should print all devices stored in the DB server and provide for adding new devices
//

var bodystuff ='<div class="container-fluid">\n'+
'  <div class="row-fluid">\n'+
'    <div class="span3 well">\n'+
'        <!--Sidebar content-->\n'+
'        <ul class="nav nav-pills nav-stacked">\n'+
'            <li class="active"><a href="devices/snmp">snmp.yawnneko.com</a></li>\n'+
'            <li>loki.yawnneko.com</li>\n'+
'            <li>router.yawnneko.com</li>\n'+
'       </ul>\n'+
'    </div>\n'+
'    <div class="span9 well">\n'+
'      <!--Body content-->\n'+
'        Item 1<br>\n'+
'        Item 2<br>\n'+
'        Graph<br>\n'+
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
