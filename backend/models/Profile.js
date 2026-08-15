const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    gender: { type: String, default: "" },
    language: { type: String, default: "" },
    occupation: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    address: { type: String, default: "" }
}, { 
    timestamps: true,
    collection: 'users'
});

module.exports = mongoose.model("Profile", profileSchema);