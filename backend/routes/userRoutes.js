import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);

export default router;
