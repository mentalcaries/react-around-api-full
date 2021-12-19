const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail() // throws a DocumentNotFoundError
    .then((cardData) => {
      res.send(cardData); // skipped, because an error was thrown
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Please submit a name and valid URL' });
      }
    });
};

const deleteCard = (req, res) => {
  // TO DO user id must  equal card owner id
  // else 'user not authorized'
  // need id of current user and card owner id.
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (req.user._id === card.owner._id.toString()) {
        Card.findByIdAndRemove({ _id: req.params.cardId })
          .orFail()
          .then((cardData) => res.send({ data: cardData }))
          .catch((err) => {
            if (err.name === 'DocumentNotFoundError') {
              res.status(404).send({ message: 'No card with that ID found' });
            } else if (err.name === 'CastError') {
              res.status(400).send({ message: 'Invalid data request' });
            }
          });
      } return ({ message: 'You\'re not authorized to do that' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((cardData) => res.send(cardData))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No card with that ID found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data request' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((cardData) => res.send(cardData))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No card with that ID found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data request' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
