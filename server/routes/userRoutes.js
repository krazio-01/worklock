import express from 'express';
const router = express.Router();
import { getUserInfo } from '../controllers/userControllers.js';

// Register API
router.get('/credentials', getUserInfo);

export default router;