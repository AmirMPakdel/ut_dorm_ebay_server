const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types } = Schema;

const PostSchema = new Schema({
  
  university:Types.String,
  seller: { type: Types.ObjectId, ref: "User" },
  category: Types.String,
  title: Types.String,
  info: Types.String,
  price: Types.Number,
  access_type: Types.String, // next update
  com_type: Types.String,
  com_id: Types.String,
  date: { type: Types.Date, default: Date.now },
  pic_n: Types.Number,
  valid: Types.Boolean,
  buyers: Types.Number // next update
});


const Post = mongoose.model("post", PostSchema);

module.exports = Post;
