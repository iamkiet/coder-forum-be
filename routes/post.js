const express = require('express');
const router = express.Router();

const {
  create: createController,
  getPostById: getPostByIdController,
} = require('../controllers/post');

const { verifyToken, mappingPaging } = require('../middleware');

/* GET home page. */
router.post('/create', verifyToken, createController);
router.get('/:id', mappingPaging, getPostByIdController);

module.exports = router;
