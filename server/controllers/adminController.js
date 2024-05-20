import CafeCard from "../models/cafeCardModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

const AddCafes = async (req, res) => {
    const { title, desc, rating, dist } = req.body;
    const imgFile = req.file;

    if (!title || !desc || !rating || !dist || !imgFile) return res.status(400).json("All fields are required");

    try {
        const result = await new Promise((resolve) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: `worklock/cafeCard`,
                    upload_preset: "worklock",
                    quality: 70,
                },
                (error, result) => {
                    if (error) return;
                    else resolve(result);
                }
            );
            uploadStream.end(imgFile.buffer);
        });

        // Create a new CafeCard instance
        const newCafeCard = new CafeCard({
            img: result.secure_url,
            title: title,
            desc: desc,
            rating: rating,
            dist: dist,
        });

        await newCafeCard.save();
        res.status(200).json("Cafe card saved successfully");
    } catch (error) {
        res.status(500).json({ Error: "Error saving cafe card:" });
    }
};

const removeCafe = async (req, res) => {
    const { id } = req.params;

    try {
        const cafe = await CafeCard.findById(id);

        const Id = cafe.img.split("/").pop().split(".")[0];
        const publicId = `worklock/cafeCard/${Id}`;
        await cloudinary.uploader.destroy(publicId);

        await cafe.deleteOne();

        res.status(200).json("Cafe card removed successfully");
    }
    catch (error) {
        res.status(500).json({ Error: "Error removing cafe card:" });
    }
}

export { AddCafes, removeCafe };
