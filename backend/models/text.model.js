const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

let Text = new Schema({
  asset_title: {
    type: String
  },
  asset_author: {
    type: String
  },
  asset_descp: {
    type: String
  },
  asset_date: {
    type: String
  },
  asset_keywords: {
    type: String
  },
  isCheckout: {
    type: Boolean,
    default: false
  },
  isCheckedoutBy: {
    type: ObjectId,
    default: null
  }
});

module.exports = mongoose.model("Text", Text, "text_files");
