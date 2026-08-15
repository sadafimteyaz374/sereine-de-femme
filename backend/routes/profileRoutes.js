const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/verifyToken'); 

router.get('/user', authMiddleware, getUserProfile);

router.put('/update', authMiddleware, updateUserProfile);

router.delete('/delete', authMiddleware, deleteUserProfile);

module.exports = router;