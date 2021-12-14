const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());

const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is Running');
});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

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
