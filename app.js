/**
 * Module dependencies.
 */

var express = require('express'),
   routes = require('./routes'),
   about = require('./routes/about'),
   alarms = require('./routes/alarms'),
   devices = require('./routes/devices'),
   api = require('./routes/api'),
   http = require('http'),
   path = require('path'),
   db = require('mongodb'),
  // backend = require('./backend'),
   poll = require('./backend/poll'),
   loop = {},
   mongoUri = process.env.MONGOLAB_URI; //mongoUri is derived from heroku's env Variable


var app = express();

app.configure(function(){
  // I guess the following means "use environment supplied port OR 3000"
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('loop', loop);
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
app.get('/alarms', alarms.index);
app.get('/devices', devices.index);
app.get('/api', api.snmpget);
app.get('/api/mib2', api.mib2);
app.get('/api/events', api.getEvents);
app.get('/api/hosts', api.getHosts);

//Poll loop
loop = setInterval(function(){
  var time = new Date();
  console.log("Interval " + time.toString());
  poll.go();
}, 5000);
//setInterval(callback, delay, [arg], [...])#
//To schedule the repeated execution of callback every delay milliseconds. Returns a intervalId for possible use with clearInterval(). Optionally you can also pass arguments to the callback.

//clearInterval(intervalId)#
//Stops a interval from triggering.

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
