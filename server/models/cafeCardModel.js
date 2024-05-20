import mongoose from "mongoose";

const cafeCardSchema = new mongoose.Schema(
    {
        img: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        dist: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('CafeCard', cafeCardSchema)