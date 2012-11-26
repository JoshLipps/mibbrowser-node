
//
// GET Devices Page
// this should print all devices stored in the DB server and provide for adding new devices
//

var bodystuff ='';
var scripts = '';

exports.index = function(req, res){
  res.render('devices', {
    title: 'NMS Devices',
    script: scripts,
    body: bodystuff
    });
};
