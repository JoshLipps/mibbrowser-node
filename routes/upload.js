
//
// GET Import Page
//

exports.import = function(req, res){
  res.render('index', { 
  	title: 'Upload a MIB ...',
	menu: '',
	body: ''
	});
};
