const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_des: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'serviceintoduction' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Serviceintro', introSchema );