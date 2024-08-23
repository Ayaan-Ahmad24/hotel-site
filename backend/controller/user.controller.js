const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
    const { name, email, password, phoneNumber, cnic } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please add all required fields' });
        }

        const existingCnic = await User.findOne({ cnic });
        if (existingCnic) {
            return res.status(400).json({ success: false, message: 'CNIC Already Exists' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email Already Exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, phoneNumber, cnic, password: hashedPassword });

        await user.save();
        return res.status(201).json({ success: true, message: 'User Registration Successful', user });
    } catch (error) {
        console.log('error in registering user', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};

// Login User/Admin
module.exports.loginUser = async (req, res) => {
    const { email, password, isAdmin} = req.body;  // Default value for isAdmin is false

    try {
        let validUser;

        if (isAdmin) {
            validUser = await Admin.findOne({ email });
            if (!validUser) return res.status(404).json({ success: false, message: "Admin Not Found" });
        } else {
            validUser = await User.findOne({ email });
            if (!validUser) return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return res.status(401).json({ success: false, message: "Wrong credentials" });

        const token = jwt.sign({ id: validUser._id, isAdmin }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).json({ success: true, rest, message: "Login Successful", token });
    } catch (error) {
        console.log("error in signing in", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get User Profile
module.exports.getProfile = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json({ success: true, message: "User data fetched successfully", user });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log("error in getting user", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


module.exports.registerAdmin = async (req, res) => {
    const { username, email, password, isAdmin } = req.body; // Get the data from the request body

    try {
        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please add all fields' });
        }

        // Check if the email already exists in the database
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin instance
        const admin = new Admin({
            username,
            email,
            password: hashedPassword,
            isAdmin: true, // Ensure that the user is marked as an admin
        });

        // Save the admin to the database
        await admin.save();

        // Send a success response
        return res.status(201).json({ success: true, message: 'Admin registered successfully', admin });
    } catch (error) {
        console.error('Error in registering admin:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

module.exports.logoutUser = (req, res) => {
    try {
        // Clear the token from the client side
        res.clearCookie('token');
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logging out", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
