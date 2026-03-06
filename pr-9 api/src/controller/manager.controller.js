const User = require('../model/User');
const jwt = require('jsonwebtoken');

//  Change Password (Manager)
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.userId);

        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Login Manager
exports.loginManager = async (req, res) => {
    try {
        const { email, password } = req.body;

        const manager = await User.findOne({ email, role: 'manager' });
        if (!manager) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await manager.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: manager._id, role: manager.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
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

//  My Profile (Manager)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Update Profile (Manager)
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

//  Add Employee
exports.addEmployee = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const employee = new User({
            name,
            email,
            password,
            phone,
            address,
            role: 'employee',
            createdBy: req.userId
        });

        await employee.save();

        res.status(201).json({
            message: 'Employee added successfully',
            employee: {
                id: employee._id,
                name: employee.name,
                email: employee.email,
                role: employee.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Calculator (Main with calculator)
exports.calculator = async (req, res) => {
    try {
        const { operation, num1, num2 } = req.body;
        let result;

        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    return res.status(400).json({ message: 'Cannot divide by zero' });
                }
                result = num1 / num2;
                break;
            default:
                return res.status(400).json({ message: 'Invalid operation' });
        }

        res.json({
            message: 'Calculation successful',
            operation,
            num1,
            num2,
            result
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  View all Employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }).select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, address, isActive } = req.body;

        const employee = await User.findByIdAndUpdate(
            id,
            { name, phone, address, isActive, updatedBy: req.userId },
            { new: true, runValidators: true }
        ).select('-password');

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({
            message: 'Employee updated successfully',
            employee
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await User.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};