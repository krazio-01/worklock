import express from 'express';
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";
import { AddCafes, removeCafe } from '../controllers/adminController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// add cafes
router.route("/add-cafe").post(protect, upload.single('imgFile'), AddCafes);

// remove cafes
router.route("/remove-cafe/:id").delete(protect, removeCafe);

export default router;