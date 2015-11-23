var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  dream: { type: String, required: true },
  location: { type: [Number], required: true },
  htmlverified: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if(!this.created_at) {
    this.created_at = now;
  }
  next();
});

UserSchema.index({location: '2dsphere'});

module.exports = mongoose.model('dream-user', UserSchema);
