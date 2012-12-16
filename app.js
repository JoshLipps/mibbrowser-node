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
    db = require('./backend/mongoConn'),
    //backend = require('./backend'),
    poll = require('./backend/poll'),
    loop = {},
    pollEnabled = (typeof process.env.NOPOLL === 'undefined');
    //db = mongoConn(process.env.MONGOLAB_URI);

var app = express();

app.configure(function(){
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
app.get('/api/host', api.getHost);
app.post('/api/host', api.postHost);
app.get('/api/history', api.getHistory);
app.get('/api/supportedOids', api.getSupportedOids);
app.get('/api/ping', api.ping);

if(pollEnabled) {
    console.log("Polling Enabled.");
    //Single out of cycle poll cycle;
    poll.go();

    //Poll loop
    loop = setInterval(function(){
    var time = new Date();
        console.log("Interval " + time.toString());
        poll.go();
    }, 30000);
} else { console.log("Polling Disabled."); }

//setInterval(callback, delay, [arg], [...])#
//To schedule the repeated execution of callback every delay milliseconds. Returns a intervalId for possible use with clearInterval(). Optionally you can also pass arguments to the callback.

//clearInterval(intervalId)#
//Stops a interval from triggering.


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
