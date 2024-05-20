import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        userId: {
            type: String,
            require: true,
        },
        cafe: {
            type: String,
            require: true,
        },
        time: {
            type: String,
            require: true,
        },
        date: {
            type: String,
            required: true,
        },
        guest: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", UserSchema);
