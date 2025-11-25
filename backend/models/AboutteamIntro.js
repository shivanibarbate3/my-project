const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sub_title: { type: String },
  short_des: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'aboutteamintro' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('AboutteamIntro', introSchema );