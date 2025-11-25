const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String },
  icon: { type: String, required: false },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'abouttimeline' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Abouttimeline', introSchema );