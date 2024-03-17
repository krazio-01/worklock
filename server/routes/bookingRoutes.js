import express from "express";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";
import { bookSpace } from "../controllers/bookingControllers.js";
// import { payment, bookSpace } from "../controllers/bookingControllers.js";

// route for making payment
// router.route("/payment").post(protect, payment);

// route for booking
router.route("/book").post(protect, bookSpace);

export default router;
