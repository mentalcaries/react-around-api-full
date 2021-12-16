const express = require('express');
const { celebrate, Joi } = require('celebrate');

function validateUrl(string) {
  return validator.isURL(string);
}

const router = express.Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.get('/:id', getUserById);

router.get('/', getUsers);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar(celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
})));

module.exports = router;
