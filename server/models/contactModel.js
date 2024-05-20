import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            require: true,
        },
        last_name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        message: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Contact", UserSchema);
