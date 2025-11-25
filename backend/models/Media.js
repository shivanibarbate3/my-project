const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  ownerIdentifier: { type: String, required: false },
  key: { type: String, required: true },
  url: { type: String, required: true },
  mime: { type: String, required: true },
  size: { type: Number, required: true },
  tags: [String],
  status: { type: String, default: 'uploaded' },
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
