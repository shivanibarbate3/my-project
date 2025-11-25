const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  product_id: mongoose.Schema.Types.ObjectId,
  ban_title_one: { type: String, required: true },
  ban_title_two: { type: String },
  ban_title_third: { type: String },
  product_image: { type: String },
  product_intro: { type: String , required: false},
  short_desc: { type: String , required: false},
  title: { type: String , required: false},
  descrip: { type: String , required: false},
  product_key: { type: String , required: false},
  product_tangiable: { type: String , required: false},
  product_lower_sec: { type: String , required: false},
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'productdetails' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Productdetails', introSchema );