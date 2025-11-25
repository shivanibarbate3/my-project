const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
  product_id: mongoose.Schema.Types.ObjectId,
  case_image: { type: String, required: true },
  short_des: { type: String },
  banner_title: { type: String },
  subtitle: { type: String },
  watch_video: { type: String , required: false},
  watch_image: { type: String , required: false},
  short_sub_title: { type: String , required: false},
  short_sub_des: { type: String , required: false},
  short_sub_subdes: { type: String , required: false},
  key_title: { type: String , required: false},
  consult_title: { type: String , required: false},
  consult_sub_title: { type: String , required: false},
  sec_title_one: { type: String , required: false},
  sec_title_des_one: { type: String , required: false},
  sec_title_two: { type: String , required: false},
  sec_title_des_two: { type: String , required: false},
  sec_title_three: { type: String , required: false},
  sec_title_three: { type: String , required: false},
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: false },
  updated_at: { type: String, required: true },
}, { collection: 'casestudydetails' }, { versionKey: false }); // Explicitly specify the collection name

module.exports = mongoose.model('Casestudies', introSchema );