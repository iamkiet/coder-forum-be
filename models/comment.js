const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    message: { type: String, default: '' },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'comment', default: null },
  },
  { timestamps: true }
);

module.exports = model('comment', commentSchema);
