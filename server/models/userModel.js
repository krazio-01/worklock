import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            max: 25,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 1,
        },
        confirm_password: {
            type: String,
            min: 1,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        emailToken: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
