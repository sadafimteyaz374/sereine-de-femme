const adminLogin = async (req, res) => {
    try {
        
        const { email, password } = req.body; 
        
        const admin_email = "adminsereine@gmail.com";
        const admin_pass = "sereinefemme@212";

        if (email === admin_email && password === admin_pass) {
        
            return res.status(200).json({
                success: true,
                message: "Welcome, Back! Login successfully"
            });
        } else {
       
            return res.status(401).json({
                success: false,
                error: "Access denied, Invalid email or password" 
            });
        }
    } catch (error) {
   
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}

module.exports = adminLogin;