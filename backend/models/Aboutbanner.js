const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  banner_image: { type: String, required: true },
  banner_mobile_image: { type: String },
  banner_title: { type: String },
  banner_title_short: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'aboutbanner' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Aboutbanner', bannerSchema );