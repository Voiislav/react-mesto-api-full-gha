const jwt = require('jsonwebtoken');

const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

module.exports = (req, res, next) => {
  const tokenFromCookie = req.cookies.jwt;

  if (!tokenFromCookie) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(tokenFromCookie, 'some-secret-key');
  } catch (error) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
