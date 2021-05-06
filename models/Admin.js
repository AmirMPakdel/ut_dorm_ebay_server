const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types } = Schema;

const AdminSchema = new Schema({
  
  admin_name: Types.String,
  admin_code: Types.String,
  access_level: Types.Number,
});


const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;