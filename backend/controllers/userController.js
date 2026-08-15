require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success: false, message: "User already existed"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name, 
            email, 
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {id: newUser._id, name: newUser.name, email: newUser.email}
        });
    }
    catch(error){
        res.status(500).json({success: false, error: error.message});
    }
};

const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid email or password"});
        }
        
        const token = jwt.sign({id: user._id,}, JWT_SECRET,{expiresIn: "7d"});

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })
    }
    catch(error){
        res.status(500).json({success: false, error: error.message});
    }
}

module.exports = {registerUser, loginUser};