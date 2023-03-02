const express = require('express');
const router = express.Router();

const {
  create: createController,
  getPostComments: getPostCommentsController,
  getReplies: getRepliesController,
} = require('../controllers/comment');

const { verifyToken, mappingPaging } = require('../middleware');

/* GET home page. */
router.post('/create', verifyToken, createController);
router.get('/:id/replies', verifyToken, mappingPaging, getRepliesController);
router.get(
  '/post-comments/:postId/',
  verifyToken,
  mappingPaging,
  getPostCommentsController
);

module.exports = router;
