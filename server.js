// DEPENDENCIES
var PORT           = process.env.PORT || 3000,
    MONGOURI       = process.env.MONGOLAB_URI || "mongodb://localhost:27017/DreamApp",
    dbname         = "DreamApp",
    mongoose       = require('mongoose'),
    express        = require('express'),
    server         = express(),
    bodyParser     = require('body-parser'),
    morgan         = require('morgan'),
    methodOverride = require('method-override'),
    flash          = require('connect-flash');

server.use(express.static('./public'));
server.use('/bower_components', express.static(__dirname + '/bower_components'));

server.use(morgan('dev'));
server.use(methodOverride('_method'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.text());
server.use(bodyParser.json({type: 'application/vnd.api+json'}));

module.exports = server;

server.use(flash());

mongoose.connect("mongodb://localhost:27017/DreamApp");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
  console.log("DATABASE UP");
});

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
});



require('./app/routes.js')(server);

server.get('/', function(req, res){
  res.render('index');
});
