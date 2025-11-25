const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  product_id: mongoose.Schema.Types.ObjectId,
  product_image: { type: String, required: true },
  
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'productimages' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Productimage', introSchema );