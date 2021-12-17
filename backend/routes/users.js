const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validator } = require('validator');

const validateURL = (string, helpers) => {
  if (validator.isURL(string)) {
    return string;
  }
  return helpers.error('string.uri');
};

const router = express.Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), getUserById);

router.get('/', getUsers);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // TO RECHECK CUSTOM VALIDATION
    avatar: Joi.string(),
  }),
}), updateAvatar);

module.exports = router;
