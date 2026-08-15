const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    material : {
        type: String,
        required: true
    },
    imageURL : {
        type: String,
        required: true
    },
    stock : {
        type: Number,
        required: true,
        default: 0
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    keywords: { 
        type: [String], 
        default: [] 
    }
});

module.exports = mongoose.model('Product', ProductSchema);