// DEPENDENCIES
var express        = require('express'),
    mongoose       = require('mongoose'),
    PORT           = process.env.PORT || 3000,
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    server         = express();

// CONNECT TO DATABASE
mongoose.connect("mongodb://localhost/DreamApp");

server.use(express.static(__dirname + '/public'));
server.use('/bower_components', express.static(__dirname + '/bower_components'));
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.text());
server.use(bodyParser.json({type: 'application/vnd.api+json'}));
server.use(methodOverride());

require('./app/routes.js')(server);

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
  console.log("DATABASE UP");
});

// // QUOTAGUARD
// var request = require('request');
//
// var options = {
//     proxy: process.env.QUOTAGUARD_URL,
//     url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3IjvUEEuhri-V2W10RshoYj2K5XRgB9g',
//     headers: {
//         'User-Agent': 'node.js'
//     }
// };
//
// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
// }
//
// request(options, callback);
