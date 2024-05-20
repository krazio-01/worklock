import { useState, useEffect } from "react";
import "./booking.css";
import CafeCard from "../../components/cafeCard/CafeCard";
import { motion } from "framer-motion";
import axios from "axios";
import { FaRegClock, FaRegUserCircle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import { loadStripe } from '@stripe/stripe-js';

const Booking = () => {
    const [loading, setLoading] = useState(false);
    const [cafes, setCafes] = useState([]);
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

            const stripe = await loadStripe("pk_test_51OtX8dSHNhJMBLp5LZkbfMi40RNYUoqrC5CdiuWrvoHMvdgYcSWko1aEPaJPnbr7d0dnfnvpXJ545kqjKmg748Ir00RrOlNPhl");

            const response = await axios.post(
                "/booking/book",
                {
                    ...formData,
                    email: user?.email,
                    cafe: cardDetails[selectedCafe]?.TITLE,
                },
                config
            );

            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id
            });

            toast.success("Successfully booked!");
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data) {
                toast.error(err.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCafes = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("booking/fetch-cafes");
                setCafes(data);
            } catch (error) {
                console.error("Error fetching cafes:", error);
            } finally {
                setLoading(false);
                setFetchUpdatedCafes(false);
            }
        };
        fetchCafes();
    }, []);

    return (
        <div className="booking">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
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
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    >
                        {selectedCafe !== null ? "Your Selected Cafe - " : "Please Select A Nearby Cafe - "}
                    </motion.h2>
                    <span>
                        {selectedCafe !== null ? cardDetails[selectedCafe].TITLE : ""}
                    </span>
                </div>
                <div className="nearbyCafes-container">
                    {cafes.map((cafe, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50, y: -50 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.15 }}
                        >
                            <CafeCard
                                key={cafe}
                                cafe={cafe}
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
