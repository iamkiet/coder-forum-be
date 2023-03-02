const PostModel = require('../models/post');

const create = async (req, res) => {
  const { title, content, tags } = req.body;
  const { user_id: author } = req.userData;
  const postCreated = await PostModel.create({ title, content, tags, author });

  res.status(200).json({ message: 'ok', post: postCreated });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findOne({ _id: id });
  res.status(200).json({ data: post });
};

module.exports = { create, getPostById };
