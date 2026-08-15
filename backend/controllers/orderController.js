const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');

const saveOrder = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { 
            shippingAddress, 
            paymentMethod, 
            paymentStatus, 
            paymentDetails, 
            cartItems, 
            isDirectBuy, 
            productId, 
            quantity, 
            size 
        } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }

        let orderItems = [];
        let totalAmount = 0;

        // 1. Agar Direct Buy hai
        if (isDirectBuy && productId) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }
            const itemQty = Number(quantity) || 1;
            orderItems.push({
                productId: product._id,
                quantity: itemQty,
                price: product.price,
                size: size || "Standard"
            });
            totalAmount = product.price * itemQty;
        } 
        // 2. Agar Cart se items aaye hain (Frontend se bheje gaye cartItems)
        else if (cartItems && cartItems.length > 0) {
            orderItems = cartItems.map(item => {
                const prod = item.productId || item;
                const itemPrice = prod.price || item.price || 0;
                const itemQty = item.quantity || 1;

                return {
                    productId: prod._id || prod,
                    quantity: itemQty,
                    price: itemPrice,
                    size: item.size || "Standard"
                };
            });
            totalAmount = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        } 
        else {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        // Naya Order database mein save karein
        const newOrder = new Order({
            userId,
            items: orderItems,
            shippingAddress,
            paymentMethod: paymentMethod || "COD",
            paymentStatus: paymentStatus || "Pending",
            paymentDetails: paymentDetails || {},
            totalAmount
        });

        await newOrder.save();

        // Agar cart se order tha, toh database ki cart clear kar dein
        if (!isDirectBuy) {
            await Cart.findOneAndUpdate({ userId }, { items: [] }).catch(() => {});
        }

        return res.status(201).json({
            success: true,
            message: "Order placed and saved successfully!",
            order: newOrder
        });

    } catch (err) {
        console.error("Error in saveOrder:", err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const createOrderFromCart = async(req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: "Your cart is empty" });
        }
        return res.status(200).json({
            success: true,
            message: "Cart items fetched for checkout successfully",
            items: cart.items
        });
    }
    catch (err) {
        console.error("Error : ", err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const createDirectOrder = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID required!" });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }
        return res.status(200).json({
            success: true,
            message: "Direct buy initialized successfully",
            item: {
                productId: product,
                quantity: Number(quantity) || 1
            }
        });
    } catch (err) {
        console.error("Error in createDirectOrder:", err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id || req.body.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }

        const orders = await Order.find({ userId })
            .populate('items.productId')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (err) {
        console.error("Error in getUserOrders:", err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const getAllOrdersForAdmin = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .populate('items.productId')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (err) {
        console.error("Error in getAllOrdersForAdmin:", err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        const validStatuses = ['Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
        if (!validStatuses.includes(orderStatus)) {
            return res.status(400).json({ success: false, message: "Invalid order status value" });
        }

        // Updated with returnDocument: 'after' to clear Mongoose deprecation warning
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { orderStatus }, 
            { returnDocument: 'after' }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder
        });
    } catch (err) {
        console.error("Error in updateOrderStatus:", err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

module.exports = {
    saveOrder,
    createOrderFromCart,
    createDirectOrder,
    getUserOrders,
    getAllOrdersForAdmin,
    updateOrderStatus
};