const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_des: { type: String },
  image: { type: String },
  video_image: { type: String , required: false},
  video: { type: String , required: false},
  slug: { type: String , required: false},
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'products' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Product', introSchema );