const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  // Existing fields
  recruiterUserID: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  candidateUserID: { type: String, required: true },
  status: { type: [String], required: true },
  jobID: { type: String, required: true },
  jobAppliedDate: { type: Date, default: Date.now },

  // New field for messages
  messages: [{ message: String, date: { type: Date, default: Date.now } }],
});

// Check if the model already exists before defining it
module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
