const Contact = require('../models/Contact');

const saveContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: "Please fill all fields" });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ 
            success: true, 
            message: "Message sent successfully!" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = { saveContactMessage };