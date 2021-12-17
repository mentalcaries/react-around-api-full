const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
// eslint-disable-next-line no-var
var cors = require('cors');

const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
app.use(helmet());
app.use(cors());
app.options('*', cors());

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());

const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');

// app.use((req, res, next) => {
//   req.user = {
//     _id: '61b50568c8570296c089b00b',
//   };

//   next();
// });

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

// app.use(auth);

app.use('/cards', cardRouter);

app.use('/users', userRouter);

app.post('/signin', (res, req) => {
  login(res, req);
});

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is Running on port ${PORT}`);
});
