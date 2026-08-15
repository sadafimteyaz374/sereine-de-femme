const Product = require('../models/Product');

const getDashboardStats = async(req , res) => {
    try {
        const totalItems = await Product.countDocuments();
        const drafts = await Product.countDocuments({stock: 0});
        const lowStock = await Product.countDocuments({stock : {$lt: 5}});
        const totalValue = await Product.aggregate([
            { $group: { _id: null, value: { $sum: { $multiply: ["$price", "$stock"] } } } }
        ]);

        res.status(200).json({
            success: true, 
            data: {
                totalItems,
                drafts,
                lowStock,
                inventoryValue: totalValue[0]?.value || 0
            }
        });
    } catch(error) {
        res.status(500).json({success: false, error: error.message});
    }
}

const getCategoryBreakdown = async (req, res) => {
    try {
        const categories = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    itemCount: { $sum: 1 },
                    totalStock: { $sum: "$stock" }
                }
            },
            { $sort: { itemCount: -1 } }
        ]);

        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { getDashboardStats, getCategoryBreakdown };