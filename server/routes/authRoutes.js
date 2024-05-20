import express from 'express';
const router = express.Router();
import { registerUser, loginUser, verifyEmail } from '../controllers/authControllers.js';

// Register API
router.post('/register', registerUser);

// Login API
router.post("/login", loginUser);

// Route for email verification
router.get("/:id/verify/:token", verifyEmail);

export default router;