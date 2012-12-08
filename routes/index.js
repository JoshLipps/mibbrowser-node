
/*
 * GET home page.
 */
var bodystuff,scripts,css;

scripts =
'<script src="/js/main.js"></script>\n' +
'<script src="/js/mib-to-json.js"></script>';

css = '<link rel="stylesheet" href="css/browser.css" />';

exports.index = function(req, res){
  res.render('browser', {
    title: 'Node NMS',
    script:scripts,
    body: bodystuff,
    css: css
    });
};
