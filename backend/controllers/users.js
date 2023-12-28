const User = require('../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const ErrorNotFound = require('../errors/ErrorNotFound');
const ServerError = require('../errors/ServerError');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const resUser = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      };
      res.status(201).json(resUser);
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ErrorConflict('Пользователь с такой почтой уже существует'));
      }
      if (error.name === 'ValidationError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new ErrorNotFound('Запрашиваемый пользователь не найден'));
      }

      res.json(user);
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find().then((users) => {
    res.json(users);
  })
  .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params.userId;

  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        return next(new ErrorNotFound('Запрашиваемый пользователь не найден'));
      }
      if (error.name === 'CastError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        return next(new ErrorNotFound('Запрашиваемый пользователь не найден'));
      }
      if (error.name === 'CastError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      if (error.name === 'ValidationError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        return next(new ErrorNotFound('Запрашиваемый пользователь не найден'));
      }
      if (error.name === 'CastError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      if (error.name === 'ValidationError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let foundUser;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new ErrorUnauthorized('Неправильные почта или пароль'));
      }
      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return next(new ErrorUnauthorized('Неправильные почта или пароль'));
      }
      const token = jwt.sign({ _id: foundUser._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.json({ message: 'Авторизация прошла успешно', token });
    })
    .catch(next);
};
