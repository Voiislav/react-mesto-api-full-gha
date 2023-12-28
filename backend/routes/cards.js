const express = require('express');

const router = express.Router();
const {
  getAllCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

const {
  createCardSchema, deleteCardSchema, addLikeSchema, removeLikeSchema,
} = require('../middlewares/validation');

router.get('/', getAllCards);
router.post('/', createCardSchema, createCard);
router.delete('/:cardId', deleteCardSchema, deleteCard);
router.put('/:cardId/likes', addLikeSchema, addLike);
router.delete('/:cardId/likes', removeLikeSchema, removeLike);

module.exports = router;
