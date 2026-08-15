const express = require('express');
const router = express.Router();

const adminLogin = require('../controllers/adminController');

const { getDashboardStats, getCategoryBreakdown } = require('../controllers/dashboardController');

router.post('/login', adminLogin);
router.get('/stats', getDashboardStats);
router.get('/categories', getCategoryBreakdown);

module.exports = router;
