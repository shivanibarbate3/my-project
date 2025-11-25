const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  category_id: mongoose.Schema.Types.ObjectId,
  title: { type: String },
  image: { type: String },
  post_date: { type: String , required: false},
  short_des: { type: String , required: false},
  slug: { type: String , required: false},
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'blogs' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Blog', introSchema );