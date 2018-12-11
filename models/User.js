const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  isActive: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
