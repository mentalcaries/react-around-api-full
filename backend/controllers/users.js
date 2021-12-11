const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No User with that ID found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data request' });
      }
    });
};

// Hash password

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Missing email or password' });
  }

  return bcrypt.hash(password, 10, (err, hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid user data' });
      }
    }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid user data' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, avatar, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid user data' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
