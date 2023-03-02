const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressListRoutes = require('express-list-routes');
dotenv.config();

const { APP_PORT } = process.env;

const app = express();
const database = require('./config/database');
const { userRoute, postRoute, commentRoute } = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

database.connect();

app.use('/ping', (_, res) => {
  res.status(200).json({
    message: 'pong',
  });
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/comment', commentRoute);

expressListRoutes(app);

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}!`);
});
