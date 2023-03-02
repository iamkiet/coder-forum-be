const express = require('express');
const router = express.Router();

const { registerController, loginController } = require('../controllers/user');

/* GET home page. */
router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;
