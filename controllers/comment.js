const CommentModel = require('../models/comment');
const PostModel = require('../models/post');

const create = async (req, res) => {
  const { message, post, parentId } = req.body;
  const { user_id: author } = req.userData;

  const messageCreated = await CommentModel.create({
    message,
    post,
    author,
    parentId,
  });

  res.status(201).json({ data: messageCreated });
};

const getPostComments = async (req, res) => {
  const { postId } = req.params;
  const { limit, skip } = req.paging;

  const comments = await CommentModel.find({ post: postId, parentId: null })
    .limit(limit)
    .skip(skip);

  return res.status(200).json({ data: comments });
};

const getReplies = async (req, res) => {
  const { id } = req.params;
  const { limit, skip } = req.paging;

  const replies = await CommentModel.find({ parentId: id })
    .limit(limit)
    .skip(skip);

  return res.status(200).json({ data: replies });
};

module.exports = { create, getPostComments, getReplies };
