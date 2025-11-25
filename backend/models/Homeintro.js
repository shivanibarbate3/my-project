const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  page_title: { type: String, required: true },
  page_sub_title: { type: String },
  page_short_des: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'homeintroduction' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Homeintro', introSchema );