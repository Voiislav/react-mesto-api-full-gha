const express = require('express');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

const { signinSchema, signupSchema } = require('./middlewares/validation');

const { errorHandler } = require('./middlewares/errorHandler');

const ErrorNotFound = require('./errors/ErrorNotFound');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signinSchema, login);

app.post('/signup', signupSchema, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new ErrorNotFound('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
});
