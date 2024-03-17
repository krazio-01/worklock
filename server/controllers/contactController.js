import Contact from "../models/contactModel.js";
import sendEmail from "../utils/sendMail.js";
import fs from "fs";

const contact = async (req, res) => {
    const { first_name, last_name, email, message } = req.body;

    if (!first_name || !last_name || !email || !message)
        return res.status(400).json("Please Fill All Fields");

    try {
        const newBooking = new Contact({
            first_name: first_name,
            last_name: last_name,
            email: email,
            message: message,
        });

        await newBooking.save();
        res.status(200).json("Querry Submitted!");

        // send email to the user
        const emailTemplate = fs.readFileSync(
            "./templates/contactMail.html",
            "utf8"
        );
        const emailContent = emailTemplate
            .replace(/{{first_name}}/g, first_name)
            .replace(/{{last_name}}/g, last_name);

        const to = email;
        const subject = "Thank you for contacting us";
        const html = emailContent;

        await sendEmail(to, subject, null, html);
    } catch (error) {
        console.error("Error booking space:", error.message);
        throw error;
    }
};

export { contact };
