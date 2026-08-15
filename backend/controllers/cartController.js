const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");

const addToCart = async (req, res) => {
    try {
        let userId = req.user?.id || req.user?._id || req.body.userId;

        if (!userId && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.id || decoded.userId || decoded._id;
        }

        const { productId, quantity = 1 } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "User ID and Product ID are required" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity: Number(quantity) }]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += Number(quantity);
            } else {
                cart.items.push({ productId, quantity: Number(quantity) });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Added to cart successfully" });
    } catch (error) {
        console.error("addToCart error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id || req.body.userId;
        const { productId } = req.params; 

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();

        res.status(200).json({ success: true, message: "Removed from cart successfully" });
    } catch (error) {
        console.error("removeFromCart error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart) {
            return res.status(200).json({ success: true, items: [] });
        }
        
        res.status(200).json({ success: true, items: cart.items });
    } catch (error) {
        console.error("getCart error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    getCart
};