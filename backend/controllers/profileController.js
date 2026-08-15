const Profile = require('../models/Profile'); // Yahi model file hai jo ab 'users' collection ko point karegi

const updateUserProfile = async (req, res) => { 
    try {
        const userId = req.user.id;
        const { phone, gender, language, occupation, city, state, pincode, address } = req.body;

        const updatedUser = await Profile.findByIdAndUpdate(
            userId,
            { phone, gender, language, occupation, city, state, pincode, address },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile details updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getUserProfile = async (req, res) => {
    try {
        console.log("Searching for user ID from token:", req.user?.id);
        const user = await Profile.findById(req.user.id).select("-password");
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Fetch profile error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const deleteUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Auth middleware se authenticated user ki ID milegi

        const deletedUser = await Profile.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User account deleted successfully"
        });
    } catch (error) {
        console.error("Delete profile error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    updateUserProfile,
    getUserProfile,
    deleteUserProfile
};