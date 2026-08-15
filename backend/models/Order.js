const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        phone: String
    },
    paymentStatus: {
        type: String,
        default: 'Pending'
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'],
        default: 'Processing'
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);