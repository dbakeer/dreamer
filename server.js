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

server.listen(PORT);
console.log("Hey, Listen!" + PORT);
