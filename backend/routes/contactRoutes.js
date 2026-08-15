const express = require('express');
const router = express.Router();
const { saveContactMessage } = require('../controllers/contactController');

router.post('/', saveContactMessage);

module.exports = router;