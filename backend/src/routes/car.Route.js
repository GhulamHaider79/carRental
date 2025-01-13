import express from 'express';
import { adminOnly, protectRoute } from '../middleware/auth.Middleware.js';
import { upload } from '../utils/multer.js';
import { register, updateCar } from '../controllers/car.Controller.js';


const router = express.Router();


router.post('/register', protectRoute, adminOnly, upload.single("image"), register);


router.put ('/update-car', protectRoute, upload.single("profilePic"), updateCar );

export default router;