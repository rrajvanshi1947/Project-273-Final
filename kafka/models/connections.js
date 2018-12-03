const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const ConnectSchema = new Schema({
  email: String,
  connected: [{ type: Schema.Types.ObjectId, ref: "User" }],
  pending: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Connection = mongoose.model("Connection", ConnectSchema);
module.exports = Connection;