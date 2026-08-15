const express = require("express");
const verifyToken = require('../middleware/verifyToken');

const {
    addToCart,
    removeFromCart, 
    getCart
} = require("../controllers/cartController");
const { get } = require("mongoose");

const router = express.Router();

router.post("/add",verifyToken, addToCart);
router.post("/remove", verifyToken, removeFromCart);
router.get("/:userId",verifyToken, getCart);

module.exports = router;