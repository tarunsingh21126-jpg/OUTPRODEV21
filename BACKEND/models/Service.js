const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  icon: { type: String, default: 'icon' },
  image: { type: String },
  features: [{
    title: String,
    description: String
  }],
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);