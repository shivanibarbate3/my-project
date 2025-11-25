const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String },
  designation: { type: String },
  experinece: { type: String },
  image: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'team' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Team', introSchema );