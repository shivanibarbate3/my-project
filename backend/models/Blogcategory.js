const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  category_name: { type: String , required: false},
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'blogcategories' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Blogcategory', introSchema );