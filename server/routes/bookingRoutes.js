import express from "express";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";
import { bookSpace, fetchBookings, fetchCafes } from "../controllers/bookingControllers.js";
// import { payment, bookSpace } from "../controllers/bookingControllers.js";

// route for making payment
// router.route("/payment").post(protect, payment);

// route for booking
router.route("/book").post(protect, bookSpace);

// route for fetching bookings
router.route("/fetch-bookings").get(fetchBookings);

// fetch cafes
router.route("/fetch-cafes").get(fetchCafes);

export default router;
