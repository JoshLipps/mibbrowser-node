
//
// GET Import Page
//

//Example table
//TODO pull this info from mongoDB
var bodystuff = '',scripts = '', css = '<link rel="stylesheet" href="css/alarms.css" />';

exports.index = function(req, res){
  res.render('alarms', {
    title: 'NMS Alarms',
    script: scripts,
    body: bodystuff,
    css: css
    });
};
