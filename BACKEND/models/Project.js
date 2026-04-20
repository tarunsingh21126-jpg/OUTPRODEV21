const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  technologies: [String],
  kpiResults: [{
    metric: String,
    value: String,
    description: String
  }],
  isFeatured: { type: Boolean, default: false },
  client: String,
  liveUrl: String,
  caseStudyUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);