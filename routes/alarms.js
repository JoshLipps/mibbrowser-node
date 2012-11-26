
//
// GET Import Page
//

//Example table
//TODO pull this info from mongoDB
var bodystuff = '';

var scripts = '';

exports.index = function(req, res){
  res.render('alarms', {
    title: 'NMS Alarms',
    script: scripts,
    body: bodystuff
    });
};
