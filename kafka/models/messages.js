const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
//const passportLocalMongoose = require('passport-local-mongoose');
autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageid:{ type: Number, default: 0, required:true },
  users: {type:Array, default:[]},
  names: {type:Array, default:[]},
  images: {type:Array, default:[]},
  messages: [{
      author: String,
      body:String,
      createdAt: Date
  }]
});

messageSchema.plugin(autoIncrement.plugin, { model : 'Message' , field: 'messageid' });
//userSchema.plugin(passportLocalMongoose, {  usernameField : 'email' , hashField : 'password' });
/*userSchema.pre('save', async function(next){
  //'this' refers to the current document about to be saved
  const user = this;
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 10);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});*/
mongoose.set('useCreateIndex', true);
//mongoose.set('useNewUrlParser', false);
//mongoose.set('useFindAndModify', false);

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;