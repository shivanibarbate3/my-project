const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_descirption: { type: String },
  icon: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'servicesecurity' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Servicesecuritydata', introSchema );