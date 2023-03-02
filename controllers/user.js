const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { TOKEN_SECRET_KEY } = process.env;

const registerController = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!(email && password && full_name)) {
      res.status(400).send('All input is required');
    }
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      full_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id, email }, TOKEN_SECRET_KEY, {
      expiresIn: '2h',
    });
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res
        .status(400)
        .json({ error: 'invalid_credentials', message: 'Invalid Credentials' });
    }

    const token = jwt.sign({ user_id: user._id, email }, TOKEN_SECRET_KEY, {
      expiresIn: '2h',
    });

    const { _id, full_name } = user;
    res.status(200).json({ _id, full_name, email, token });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'invalid_credentials', message: err.message || '' });
  }
};

module.exports = { registerController, loginController };
