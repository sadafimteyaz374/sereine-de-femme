const express = require("express");
const verifyToken = require('../middleware/verifyToken');
// Agar aapke paas koi admin verification middleware hai toh use yahan import kar lein, jaise:
// const verifyAdmin = require('../middleware/verifyAdmin'); 

const Razorpay = require('razorpay');
require('dotenv').config();

const {
    saveOrder,
    createOrderFromCart,
    createDirectOrder,
    getUserOrders,
    getAllOrdersForAdmin,  // <-- Added for Admin
    updateOrderStatus      // <-- Added for Admin
} = require("../controllers/orderController");

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ================= USER ROUTES =================
router.get('/my-orders', verifyToken, getUserOrders);
router.post('/save-order', verifyToken, saveOrder);
router.post('/create-from-cart', verifyToken, createOrderFromCart);
router.post('/create-direct', verifyToken, createDirectOrder);

// ================= RAZORPAY PAYMENT =================
router.post('/create-razorpay-order', verifyToken, async(req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_order_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    }
    catch(err) {
        console.error("Razorpay Order creation error: ", err);
        res.status(500).json({ success: false, message: "Failed to create razorpay order" });
    }
});


router.get('/admin/all-orders', getAllOrdersForAdmin);
router.put('/admin/update-status/:orderId', updateOrderStatus);

module.exports = router;