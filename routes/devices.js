
//
// GET Devices Page
//

var bodystuff =
'';

var scripts = '';

exports.index = function(req, res){
  res.render('index', {
    title: 'NMS Devices',
    script: scripts,
    body: bodystuff
    });
};
