const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  product_id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  per: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'producttangible' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Producttangiable', introSchema );