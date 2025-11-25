const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  banner_image: { type: String, required: true },
  banner_mobile_image: { type: String },
  banner_title: { type: String },
  banner_title_short_one: { type: String },
  banner_title_short_two: { type: String },
  created_at: { type: String, required: true },
  deleted_at: { type: String },
  updated_at: { type: String, required: true },
}, {
  collection: 'sliders',
  versionKey: false
});

module.exports = mongoose.model('Slider', sliderSchema);