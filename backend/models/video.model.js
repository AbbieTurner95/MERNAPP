const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

let Video = new Schema({
  asset_title: {
    type: String
  },
  asset_author: {
    type: String
  },
  asset_descp: {
    type: String
  },
  asset_size: {
    type: String
  },
  asset_length: {
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
  },
  asset_version: {
    type: Number
  }
});

module.exports = mongoose.model("video", Video, "video_files");
