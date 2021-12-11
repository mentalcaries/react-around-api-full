const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());

const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is Running');
});

app.use((req, res, next) => {
  req.user = {
    _id: '618bb4f9997ea749959e68c8',
  };

  next();
});
app.use('/cards', cardRouter);

app.use('/users', userRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
