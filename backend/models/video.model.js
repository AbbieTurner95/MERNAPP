const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

let Video = new Schema({
  isCheckedout: { type: Boolean, default: false },
  isCheckedoutBy: { type: ObjectId, default: null },

  newest_version: {
    asset_title: { type: String },
    asset_author: { type: String },
    asset_descp: { type: String },
    asset_size: { type: String },
    asset_length: { type: String },
    asset_date: { type: String },
    asset_keywords: { type: String },
    asset_version: { type: Number },
    edited_at: { type: Date },
    edited_by: { type: ObjectId }
  },

  all_versions: [
    {
      asset_title: { type: String },
      asset_author: { type: String },
      asset_descp: { type: String },
      asset_size: { type: String },
      asset_length: { type: String },
      asset_date: { type: String },
      asset_keywords: { type: String },
      asset_version: { type: Number },
      edited_at: { type: Date },
      edited_by: { type: ObjectId }
    }
  ]
});

module.exports = mongoose.model("video", Video, "video_files");
