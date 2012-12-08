
//
// GET Devices Page
// this should print all devices stored in the DB server and provide for adding new devices
//

var bodystuff ='',scripts = '',css = '<link rel="stylesheet" href="css/devices.css" />';

exports.index = function(req, res){
  res.render('devices', {
    title: 'NMS Devices',
    script: scripts,
    body: bodystuff,
    css: css
    });
};
