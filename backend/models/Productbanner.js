const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'productbanner' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Productbanner', bannerSchema );