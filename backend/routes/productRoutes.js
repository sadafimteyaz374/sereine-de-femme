const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
    addProduct,
    getAllProduct,
    getProductById,
    editProduct,
    deleteProduct,
    searchProducts,
    getNewArrivals,
    getCategories
} = require('../controllers/productController');


router.get('/search', searchProducts); 
router.get('/new', getNewArrivals); 
router.get('/all', getAllProduct);
router.get('/categories/list', getCategories);

router.post('/add', upload.single('image'), addProduct);


router.get('/:id', getProductById);
router.put('/:id', upload.single('image'), editProduct);
router.delete('/:id', deleteProduct);

module.exports = router;