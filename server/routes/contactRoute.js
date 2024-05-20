import express from "express";
const router = express.Router();
import { contact } from "../controllers/contactController.js";

// contact API
router.route("/contact-us").post(contact);

export default router;
