// Example auth controller for user authentication
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
