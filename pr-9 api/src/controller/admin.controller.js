const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//     Register Admin
exports.registerAdmin = async (req, res) => {
    console.log(req.body);
    try {
        
        const { name, email, password, phone, address } = req.body;

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists with this email' });
        }

        // Create new admin
        let hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role: 'admin'
        });

        await admin.save();

        // Generate token
        const token = jwt.sign(
            { userId: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Admin registered successfully',
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Login Admin
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  My Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, phone, address, updatedBy: req.userId },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Change Password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.userId);

        // Verify current password
        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Delete Admin
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if trying to delete self
        if (id === req.userId.toString()) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        const admin = await User.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Add Manager
exports.addManager = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create new manager
        const manager = new User({
            name,
            email,
            password,
            phone,
            address,
            role: 'manager',
            createdBy: req.userId
        });

        await manager.save();

        res.status(201).json({
            message: 'Manager added successfully',
            manager: {
                id: manager._id,
                name: manager.name,
                email: manager.email,
                role: manager.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  View all Managers
exports.getAllManagers = async (req, res) => {
    try {
        const managers = await User.find({ role: 'manager' }).select('-password');
        res.json(managers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Manager
exports.updateManager = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, address, isActive } = req.body;

        const manager = await User.findByIdAndUpdate(
            id,
            { name, phone, address, isActive, updatedBy: req.userId },
            { new: true, runValidators: true }
        ).select('-password');

        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        res.json({
            message: 'Manager updated successfully',
            manager
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Delete Manager
exports.deleteManager = async (req, res) => {
    try {
        const { id } = req.params;

        const manager = await User.findByIdAndDelete(id);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        res.json({ message: 'Manager deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};