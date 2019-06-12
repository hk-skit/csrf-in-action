const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true }
  },
  // Suppressing mongoose id to avoid redundant id field in model.
  { id: false }
);

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
