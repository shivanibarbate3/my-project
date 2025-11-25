const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: String, required: true },
  deleted_at: { type: String, required: true },
  password_act: { type: String, required: true },
  updated_at: { type: String, required: true },

});

module.exports = mongoose.model('User', UserSchema);