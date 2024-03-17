import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from './routes/contactRoute.js';

dotenv.config();
const Port = process.env.PORT || 8800;

// connecting db
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Error while connecting to DB", err);
    });

const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);

app.listen(Port, () => {
    console.log("Server is running on port", Port);
});
