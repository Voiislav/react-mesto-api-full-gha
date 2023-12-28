const { celebrate, Joi, Segments } = require('celebrate');

const createCardSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
});

const deleteCardSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const addLikeSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const removeLikeSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const updateProfileSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});

const getUserByIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const getCurrentUserSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  createCardSchema,
  deleteCardSchema,
  addLikeSchema,
  removeLikeSchema,
  updateProfileSchema,
  updateAvatarSchema,
  getUserByIdSchema,
  getCurrentUserSchema,
};
