const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types } = Schema;

const UserSchema = new Schema({
  
  token: Types.String,
  email: Types.String,
  password: Types.String,
  full_name: Types.String,
  //student_id: Types.String,
  verification_code: Types.String, //{ type: Types.String, default: 'no' },
  phone_number: Types.String,
  telegram: Types.String,
  instagram: Types.String,
  university: Types.String,
  post_n: Types.Number,
  max_post: Types.Number
});


UserSchema.statics.findByToken = function(token, cb) {
  return this.findOne({ token: token }, cb);
};


const User = mongoose.model("user", UserSchema);

module.exports = User;