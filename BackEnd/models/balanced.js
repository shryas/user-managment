var mongoose = require('mongoose');
var slug = require('slug');
var User = mongoose.model('User');

var BalancedSchema = new mongoose.Schema({
  username: String,
  message: String,
  count: Number
}, { timestamps: true });


BalancedSchema.methods.toJSONFor = function(){
  return {
  username: this.username,
  message: this.message,
  attempts: this.count
  }
}



mongoose.model('Balanced', BalancedSchema);