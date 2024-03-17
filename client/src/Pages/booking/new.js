import { useState } from "react";
import "./booking.css";
import CafeCard from "../../components/cafeCard/CafeCard";
import { motion } from "framer-motion";
import axios from "axios";
import { FaRegClock, FaRegUserCircle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import Item1 from "../../assets/images/cafe1.jpg";
import Item2 from "../../assets/images/cafe2.jpg";
import Item3 from "../../assets/images/cafe3.jpg";
import Item4 from "../../assets/images/cafe4.jpg";
import Item5 from "../../assets/images/cafe5.jpg";
import Item6 from "../../assets/images/cafe6.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import { loadStripe } from "@stripe/stripe-js";

const cardDetails = [
    {
        IMG: Item1,
        TITLE: "Love Over Coffee",
        desc: "Where connections deepen, shared over steaming cups and whispered conversations. ",
        rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        dist: (Math.random() * (5 - 1) + 1).toFixed(1),
    },
    {
        IMG: Item2,
        TITLE: "Nothing Before Coffee",
        desc: "Fueling your mornings with robust espressos before facing the day.",
        rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        dist: (Math.random() * (5 - 1) + 1).toFixed(1),
    },
    {
        IMG: Item3,
        TITLE: "Cafeholic",
        desc: "A haven for coffee devotees, offering a symphony of flavors and brewing techniques.",
        rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        dist: (Math.random() * (5 - 1) + 1).toFixed(1),
    },
    {
        IMG: Item4,
        TITLE: "Mug's n Magic",
        desc: "Where every mug holds a touch of magic, created with expertly crafted Americanos and other coffee delights.",
        rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        dist: (Math.random() * (5 - 1) + 1).toFixed(1),
    },
    {
        IMG: Item5,
        TITLE: "Chai Sutta Darbaar",
        desc: "Imbibe in aromatic chai and engage in captivating conversations in this welcoming space.",
        rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        dist: (Math.random() * (5 - 1) + 1).toFixed(1),
    },
    {
        IMG: Item6,
        TITLE: "GVD Soni's Cafe",
        desc: "A cafe steeped in tradition and warmth, named after its passionate owner/founder.",
        rating: (Math.random() * (5 - 1) + 1).toFixed(1),
        dist: (Math.random() * (5 - 1) + 1).toFixed(1),
    },
];

const Booking = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCafe, setSelectedCafe] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        time: "",
        date: "",
        guest: 0,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            toast.error("Please Sign In First!");
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user?.authToken}`,
            },
        };

        try {
            setLoading(true);

            const stripe = await loadStripe(
                "pk_test_51OtX8dSHNhJMBLp5LZkbfMi40RNYUoqrC5CdiuWrvoHMvdgYcSWko1aEPaJPnbr7d0dnfnvpXJ545kqjKmg748Ir00RrOlNPhl"
            );

            const paymentResponse = await axios.post(
                "http://localhost:8800/api/booking/payment",
                {
                    cafe: cardDetails[selectedCafe]?.TITLE,
                },
                config
            );

            console.log("response: ", paymentResponse);

            const result = await stripe.redirectToCheckout({
                sessionId: paymentResponse.data.id,
            });

            alert("just above book api call")
            const bookingtResponse = await axios.post(
                "http://localhost:8800/api/booking/book",
                {
                    ...formData,
                    email: user.email,
                    cafe: cardDetails[selectedCafe]?.TITLE,
                },
                config
            );

            toast.success(bookingtResponse.data);
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data) {
                toast.error(err.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="booking-container"
            >
                <div className="booking-header">
                    <span>Wor-K-Lock</span>
                    <h2>Book Your Space</h2>
                </div>

                <div className="book">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <FaRegUserCircle />
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <FaRegClock />
                            <input
                                type="text"
                                placeholder="Time (hh:mm AM/PM)"
                                name="time"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <FaRegClock />
                            <input
                                type="date"
                                placeholder="Date"
                                name="date"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <FaPeopleGroup />
                            <input
                                type="number"
                                placeholder="Guests"
                                inputMode="numeric"
                                name="guest"
                                onChange={handleChange}
                            />
                        </div>

                        <button disabled={loading} type="submit">
                            {loading ? <BeatLoader color="#fff" size={12} /> : "Book Now"}
                        </button>
                    </form>
                </div>
            </motion.div>

            <div className="nearbyCafes">
                <div className="nearbyCafes-header">
                    <motion.h2
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    >
                        {selectedCafe !== null
                            ? "Your Selected Cafe - "
                            : "Please Select A Nearby Cafe - "}
                    </motion.h2>
                    <span>
                        {selectedCafe !== null ? cardDetails[selectedCafe].TITLE : ""}
                    </span>
                </div>
                <div className="nearbyCafes-container">
                    {cardDetails.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50, y: -50 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.15 }}
                        >
                            <CafeCard
                                key={index}
                                {...item}
                                onSelect={() => {
                                    setSelectedCafe(index);
                                }}
                                isSelected={selectedCafe === index}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Booking;
