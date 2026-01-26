import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id); // wait, generateToken returns token string in my util.
        // My util: returns jwt.sign(...) string.

        // Correction: In MERN, often we send token in JSON response OR httpOnly cookie.
        // The plan implied JSON response. "return user + token".

        const token = generateToken(user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / Clear cookie (if enabled)
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    // Since we are using stateless JWT in JSON, logout is client-side.
    // But we provide this endpoint for consistency or future cookie implementation.
    res.status(200).json({ message: 'User logged out' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user is set by authMiddleware
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };

    res.status(200).json(user);
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
};
