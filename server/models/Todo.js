const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    createdBy: { type: String, required: true },
    text: { type: String, required: true },
    complete: { type: Boolean, default: false }
  },
  // Suppressing mongoose id to avoid redundant id field in model.
  { id: false }
);

todoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Todo', todoSchema);
