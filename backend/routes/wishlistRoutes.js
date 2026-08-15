const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add', verifyToken, addToWishlist);
router.delete('/remove/:productId', verifyToken, removeFromWishlist);
router.get('/', verifyToken, getWishlist); 

module.exports = router;