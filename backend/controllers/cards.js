const Card = require('../models/card');

const ErrorNotFound = require('../errors/ErrorNotFound');
const ForbiddenError = require('../errors/ForbiddenError');
const ServerError = require('../errors/ServerError');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

module.exports.getAllCards = (req, res, next) => {
  Card.find().then((cards) => {
    res.json(cards);
  })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).json({ data: card });
    })
    .catch((err) => {
      if (err.name === 'Validation Error') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new ErrorNotFound('Карточка не найдена'));
      }
      if (card.owner.toString() !== userId) {
        return next(new ForbiddenError('Нет прав для удаления этой карточки'));
      }
      return Card.deleteOne(card);
    })
    .then(() => {
      res.json({ message: 'Карточка успешно удалена' });
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new ErrorNotFound('Данных с указанным id не существует'))
    .then((card) => {
      res.json(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new ErrorNotFound('Данных с указанным id не существует'))
    .then((card) => {
      res.json(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};
