const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middlewares
// FRONTEND_URL can be a single origin or a comma-separated list
// (e.g. your Vercel production domain + preview deployments).
// If it's not set, all origins are allowed — fine for local dev,
// but set FRONTEND_URL in production for tighter security.
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim())
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(logger); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded product images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/orders",orderRoutes);

const faqRoutes = require('./routes/faqRoutes');
app.use('/api/faq', faqRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Sereine De Femme API is running' });
});


// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Sereine API Server running on port ${PORT}`);
});