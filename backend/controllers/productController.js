const Product = require('../models/Product');

const addProduct = async (req, res) => {
    try {
        let keywordsArray = [];
        if (req.body.keywords) {
            if (Array.isArray(req.body.keywords)) {
                keywordsArray = req.body.keywords;
            } else if (typeof req.body.keywords === 'string') {
                keywordsArray = req.body.keywords.split(',').map(k => k.trim()).filter(k => k);
            }
        }

        const productData = {
            ...req.body,
            keywords: keywordsArray,
            imageURL: req.file ? `/uploads/${req.file.filename}` : "https://via.placeholder.com/400x400?text=Sereine+De+Femme"
        };

        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log("Mongoose Error:", error.message);
        res.status(400).json({ success: false, error: error.message });
    }
}

const getRandomProducts = async (req, res) => {
    try {
        const size = parseInt(req.query.size) || 8;
        const randomProducts = await Product.aggregate([
            { $sample: { size: size } }
        ]);
        res.status(200).json({ success: true, data: randomProducts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getAllProduct = async(req, res) => {   
    try{
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: products });
    }
    catch(error){
        res.status(500).json({success: false, error: error.message});
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const editProduct = async(req, res) => {
    try{
        const productId = req.params.id;
        const updateData = { ...req.body };

        // Agar keywords update ho rahe hain toh unhe bhi array mein convert karein
        if (updateData.keywords) {
            if (Array.isArray(updateData.keywords)) {
                // already array
            } else if (typeof updateData.keywords === 'string') {
                updateData.keywords = updateData.keywords.split(',').map(k => k.trim()).filter(k => k);
            }
        }

        if (req.file) {
            updateData.imageURL = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        if(!updatedProduct){
           return res.status(404).json({success: false, message: "Didn't find product"});
        }

        res.status(200).json({success: true, data: updatedProduct});
    }
    catch(error){
        res.status(500).json({success: false, error: error.message});
    }
}

const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({success: false, message: "Product Not Found"});
        }

        res.status(200).json({success: true, message: "Product deleted successfully"});
    }
    catch(error){
        res.status(500).json({success:false, error: error.message});
    }
}


const searchProducts = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ success: false, error: "Query is required" });
        }

        const regex = new RegExp(query, 'i'); // Case-insensitive search

        const products = await Product.find({
            $or: [
                { name: regex },
                { category: regex },
                { material: regex },
                { keywords: regex } 
            ]
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getNewArrivals = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 }).limit(12);
        return res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        console.error("Error in getNewArrivals:", err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

const getCategories = async (req, res) => {
    try {

        const categories = await Product.distinct("category");
        
        const collectionData = categories.map(cat => ({
            title: cat,
            subtitle: `Explore our exquisite ${cat} collection`,
            categoryKey: cat,
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"
        }));

        res.status(200).json({ success: true, data: collectionData });
    } catch (error) {
        console.error("Error in getCategories:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = {
    addProduct,
    getAllProduct,
    getProductById,
    editProduct,
    deleteProduct,
    getRandomProducts,
    searchProducts,
    getNewArrivals,
    getCategories
};