// Define a plan for a collection
const mongoose = require('mongoose');

// Schema for a collection of voter
const Voter = new mongoose.Schema({
  first_name: String,
  last_name: String,
  zip: Number,
  history: String
});

// Speed up queries on all fields
Voter.index({first_name: 1});
Voter.index({last_name: 1});
Voter.index({zip: 1});
Voter.index({history: 1});

// Compile and export this schema
module.exports = mongoose.model('Voter', Voter);
