const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = model('post', postSchema);
