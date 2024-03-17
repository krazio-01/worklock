import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendMail.js";
import generateAuthToken from "../config/generateAuthToken.js";
import fs from "fs";

const registerUser = async (req, res) => {
    const { name, email, password, confirmPass } = req.body;

    if (!name || !email || !password || !confirmPass)
        return res.status(400).json({ Error: "Please fill in all fields" });

    if (password.length < 6)
        return res
            .status(400)
            .json({ Error: "Password must be at least 6 characters" });

    if (password !== confirmPass)
        return res.status(400).json({ Error: "Passwords do not match" });

    let userExist = await User.findOne({ email: email });
    if (userExist)
        return res
            .status(400)
            .json({ Error: "This Account is already registered!" });

    // create salt for hashing of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if the email is from Gmail domain
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'gmail.com')
        return res.status(400).json({ Error: 'Only Gmail accounts are allowed' });

    // create new user
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        emailToken: crypto.randomBytes(32).toString("hex"),
    });

    // save user and respond
    try {
        const user = await newUser.save();

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                authToken: generateAuthToken(user._id),
            });
        } else res.status(400).json({ Error: "Something went wrong" });

        const to = user.email;
        let subject = null,
            html = null;

        const regTemplate = fs.readFileSync(
            "./templates/registerTemplate.html",
            "utf8"
        );

        const registrationContent = regTemplate
            .replace(/{{name}}/g, user.name)
            .replace(/{{server_url}}/g, process.env.SERVER_URL)
            .replace(/{{id}}/g, user._id)
            .replace(/{{emailToken}}/g, user.emailToken);

        // send verification mail to the user
        subject = "Account Verification";
        html = registrationContent;
        await sendEmail(to, subject, null, html);

        const welcomeTemplate = fs.readFileSync(
            "./templates/welcomeTemplate.html",
            "utf8"
        );

        const welcomeContent = welcomeTemplate
            .replace(/{{name}}/g, user.name)

        // send welcome mail to the user
        subject = "Welcome to Wor-K-Lock!";
        html = welcomeContent;
        await sendEmail(to, subject, null, html);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ Error: "Please fill in all fields" });

    try {
        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ Error: "Invalid credentials!" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ Error: "Invalid credentials!" });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            emailToken: user.emailToken,
            authToken: generateAuthToken(user._id),
        });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};

const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token)
            return res
                .status(400)
                .render("../utils/emailVerification.ejs", { message: "Invalid link" });

        const user = await User.findOne({ emailToken: token });
        if (!user)
            return res
                .status(404)
                .render("../utils/templates/emailVerification.ejs", {
                    message: "Your account is already verified",
                });

        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        res
            .status(200)
            .render("../utils/emailVerification.ejs", {
                message: "Email successfully verified. You can now close this window",
            });
    } catch (error) {
        res.status(500).send(error);
    }
};

export { registerUser, loginUser, verifyEmail };
