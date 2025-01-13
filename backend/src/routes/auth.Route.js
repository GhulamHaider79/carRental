import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.Contoller.js';
import { protectRoute } from '../middleware/auth.Middleware.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.put ('/update-profile', protectRoute, upload.single("profilePic"), updateProfile );




export default router;