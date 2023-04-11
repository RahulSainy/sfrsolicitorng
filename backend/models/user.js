const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  agree: {
    type: Boolean,
    required: true
  },
  approve: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model('User', UserSchema);
