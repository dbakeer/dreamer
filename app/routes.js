var mongoose = require('mongoose'),
    User     = require('./model.js');

module.exports = function(server){
  server.get('/users', function(req, res){
    var query = User.find({});
    query.exec(function(err, users){
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

  server.post('/users', function(req, res){

    var newUser = new User(req.body);

    newUser.save(function(err){
      if (err) {
        res.send(err);
      }
      res.json(req.body);
    });
  });
};
