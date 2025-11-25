const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  blog_id: mongoose.Schema.Types.ObjectId,
  banner_title: { type: String },
  details_page_image: { type: String },
  description: { type: String , required: false},
  quote: { type: String , required: false},
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'blogsdetails' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Blogdetails', introSchema );