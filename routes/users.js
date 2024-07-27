var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/park-here')
let ppm = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
  username:String,
  email:String,
  password:String,
  secret:String
})
userSchema.plugin(ppm)
module.exports = mongoose.model('user',userSchema);
