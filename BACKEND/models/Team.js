const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  image: { type: String, required: true },
  bio: String,
  linkedin: String,
  twitter: String,
  isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);