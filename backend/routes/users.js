const express = require('express');

const router = express.Router();
const {
  getAllUsers, getCurrentUser, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

const {
  updateProfileSchema,
  updateAvatarSchema,
  getUserByIdSchema,
} = require('../middlewares/validation');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserByIdSchema, getUserById);
router.patch('/me', updateProfileSchema, updateProfile);
router.patch('/me/avatar', updateAvatarSchema, updateAvatar);

module.exports = router;
