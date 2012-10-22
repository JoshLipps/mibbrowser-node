
/*
 * GET home page.
 */
 
exports.cats = function(req, res){
	var lipps = {one:"josh",
	two:"mm"}, whosit;
	whosit = lipps[req.query.host];
	console.log(whosit+ " "+req.query.host);
  res.send(whosit);
};