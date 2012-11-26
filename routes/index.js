
/*
 * GET home page.
 */
var bodystuff,scripts;

scripts =
'<script src="/js/main.js"></script>\n' +
'<script src="/js/mib-to-json.js"></script>';

exports.index = function(req, res){
  res.render('browser', {
    title: 'Node NMS',
    script:scripts,
    body: bodystuff
    });
};
