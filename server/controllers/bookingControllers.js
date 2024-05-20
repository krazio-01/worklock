import Booking from "../models/bookingModel.js";
import CafeCard from "../models/cafeCardModel.js";
import sendEmail from "../utils/sendMail.js";
import stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

// 4000003560000008 - card number (indian card)

const bookSpace = async (req, res) => {
    const { name, time, date, guest, email, cafe } = req.body;

    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;

    const userId = req.userId;

    if (!name || !time || !date || !guest || !cafe)
        return res.status(400).json("Please Fill All Fields");

    if (!timeRegex.test(time))
        return res.status(400).json("Time must be in HH:MM AM/PM format.");

    if (guest > 7)
        return res.status(400).json("Maximum of 7 guests allowed per booking.");

    try {
        const existingBooking = await Booking.findOne({ userId, cafe });

        if (existingBooking)
            return res.status(400).json("You already have a booking in this cafe.");

        const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: cafe,
                        },
                        unit_amount: 299 * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/`,
            cancel_url: `http://localhost:5173/abc`,
        });

        const newBooking = new Booking({
            name: name,
            userId: userId,
            cafe: cafe,
            time: time,
            date: date,
            guest: guest,
        });

        await newBooking.save();
        res.status(200).json({ id: session.id });

        const emailTemplate = fs.readFileSync(
            "./templates/bookingTemplate.html",
            "utf8"
        );
        const emailContent = emailTemplate
            .replace(/{{name}}/g, name)
            .replace(/{{time}}/g, time)
            .replace(/{{date}}/g, date)
            .replace(/{{guest}}/g, guest);

        // send email to the user
        const to = email;
        let subject = null,
            html = null;

        subject = "Booking Confirmation";
        html = emailContent;
        setTimeout(() => {
            sendEmail(to, subject, null, html);
        }, 15000);
    } catch (error) {
        console.error("Error booking space:", error.message);
        throw error;
    }
};

const fetchBookings = async (req, res) => {
    try {
        // fetch all the bookings from database
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const fetchCafes = async (req, res) => {
    try {
        const cafes = await CafeCard.find();
        res.status(200).json(cafes);
    } catch (error) {
        res.status(500).json({ Error: "Error fetching cafe cards:" });
    }
};

export { bookSpace, fetchBookings, fetchCafes };
