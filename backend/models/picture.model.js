const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

let Picture = new Schema({
  isCheckedout: { type: Boolean, default: false },
  isCheckedoutBy: { type: ObjectId, default: null },

  newest_version: {
    asset_version: { type: Number },
    asset_title: { type: String },
    asset_author: { type: String },
    asset_size: { type: String },
    asset_descp: { type: String },
    asset_date: { type: String },
    asset_keywords: { type: String },
    edited_at: { type: Date },
    edited_by: { type: ObjectId }
  },

  all_versions: [
    {
      asset_version: { type: Number },
      asset_title: { type: String },
      asset_author: { type: String },
      asset_size: { type: String },
      asset_descp: { type: String },
      asset_date: { type: String },
      asset_keywords: { type: String },
      edited_at: { type: Date },
      edited_by: { type: ObjectId }
    }
  ]
});

module.exports = mongoose.model("Picture", Picture, "picture_files");
