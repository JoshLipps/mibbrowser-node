
/**
 * Module dependencies.
 */

var express = require('express'),
   routes = require('./routes'),
   about = require('./routes/about'),
   api = require('./routes/api'),
   http = require('http'),
   path = require('path');

var app = express();

app.configure(function(){
  // I guess the following means "use environment supplied port OR 3000"
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  // Logs everything:
  app.use(express.logger('dev'));
  // Parses JSON in POSTs:
  app.use(express.bodyParser());
  // For use with forms and PUT requests:
  app.use(express.methodOverride());
  // For later session control implementation:
  //app.use(express.cookieParser('your secret here'));
  ///app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/about', about.index);
app.get('/api', api.snmpget);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
