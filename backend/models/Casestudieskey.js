const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  casestudy_id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  icon: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'casestudykeybenefits' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Casestudieskey', introSchema );