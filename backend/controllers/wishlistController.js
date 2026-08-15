const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

const addToWishlist = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id || req.body.userId;
        const { productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "User ID and Product ID are required" });
        }

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({
                userId,
                products: [productId]
            });
        } else {
            // Check if product already exists in wishlist array
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
            }
        }

        await wishlist.save();
        res.status(200).json({ success: true, message: "Added to wishlist successfully" });
    } catch (error) {
        console.error("addToWishlist error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } }, 
            { new: true }
        );

        if (!updatedWishlist) {
            return res.status(404).json({ success: false, message: "Wishlist not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Item removed from wishlist successfully", 
            wishlist: updatedWishlist 
        });
    } catch (err) {
        console.error("removeFromWishlist error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;

        let wishlist = await Wishlist.findOne({ userId }).populate('products');
        
        if (!wishlist) {
            return res.status(200).json({ success: true, wishlist: [] });
        }

        res.status(200).json({ 
            success: true, 
            wishlist: wishlist.products || wishlist.items || [] 
        });
    } catch (err) {
        console.error("Backend Error:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
};