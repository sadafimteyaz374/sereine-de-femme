const express = require('express');
const router = express.Router();
const { askFAQChatbot } = require('../controllers/faqController');

router.post('/chat', askFAQChatbot);

module.exports = router;