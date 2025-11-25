const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_des: { type: String },
  name: { type: String },
  explore: { type: String },
  tag: { type: String },
  facebook: { type: String },
  linkdin: { type: String },
  twitter: { type: String },
  image: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'aboutdirectorintro' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Aboutdireactintro', introSchema);