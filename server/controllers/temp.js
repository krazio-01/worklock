import Booking from "../models/bookingModel.js";
import sendEmail from "../utils/sendMail.js";
import stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
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
            return res.status(400).json("You have already booked in this cafe.");

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

        const stripeSession = await session;

        // if (stripeSession.payment_status !== 'paid')
        //     return res.status(400).json({ error: 'Payment failed.' });

        const newBooking = new Booking({
            name: name,
            userId: userId,
            cafe: cafe,
            time: time,
            date: date,
            guest: guest,
        });

        // await newBooking.save();
        res.status(200).json({ id: stripeSession.id });

        // send email to the user
        const to = email;
        let subject = null,
            html = null;

        subject = "Booking Confirmation";
        html = `Dear ${name},<br /><br />Your Booking has been confirmed.<br /><br />Booking Details:<br /><br />
        Name: ${name}<br />Scheduled Time: ${time}<br />Scheduled Date: ${date}<br />Guests: ${guest}<br /><br />Thanks for choosing us.<br/><br/>Best
        regards,<br />The wor-k-lock Team`;
        // await sendEmail(to, subject, null, html);
    } catch (error) {
        console.error("Error booking space:", error.message);
        throw error;
    }
};

export { bookSpace };
