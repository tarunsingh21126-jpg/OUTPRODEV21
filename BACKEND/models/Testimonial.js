const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  image: { type: String },
  isVideo: { type: Boolean, default: false },
  videoUrl: String,
  isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);