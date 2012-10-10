
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Mib-Browser',
  	menu: 'menu',
	body: 'body'
	});
};
