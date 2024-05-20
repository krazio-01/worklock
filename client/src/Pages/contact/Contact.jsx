import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import "./contact.css";
import {
    FaPhone,
    FaLocationArrow,
    FaAddressCard,
    FaEnvelope,
    FaInbox,
} from "react-icons/fa";
import Wave from "../../assets/svg/Wave";
import ContactUsAnim from "../../assets/json/contactUs.json";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";

const InputField = (props) => {
    const { type, name, label, icon, handleChange } = props;
    const [isFocused, setIsFocused] = useState(false);
    const InputComponent = type === "textarea" ? "textarea" : "input";

    return (
        <div className={`input-wrap ${isFocused ? "focus not-empty" : ""}`}>
            <InputComponent
                type={type}
                autoComplete="off"
                name={name}
                onFocus={() => {
                    setIsFocused(true);
                }}
                onBlur={(e) => {
                    setIsFocused(!!e.target.value);
                }}
                onChange={handleChange}
            />
            <label>{label}</label>
            {icon && icon}
        </div>
    );
};

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post(
                "/contact/contact-us",
                formData
            );
            toast.success(response.data);
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact">
            <div className="contact-container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="contact-header"
                >
                    <h3>Have Some Question?</h3>
                    <p>
                        Thank you for your interest in our services. Please fill out the
                        form below or contact us at <span>worklock@gmail.com</span> and we
                        will get back to you promptly regarding your inquiry.
                    </p>
                </motion.div>

                <div className="contact-form-container">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 175,
                            delay: 0.2,
                        }}
                        className="form-info"
                    >
                        <Lottie animationData={ContactUsAnim} />
                        <div className="contact-info">
                            <h3>Get in touch</h3>
                            <div></div>
                            <ul>
                                <li>
                                    <FaPhone />
                                    <span>+91 9352072344</span>
                                </li>
                                <li>
                                    <FaEnvelope />
                                    <span>worklock@gmail.com</span>
                                </li>
                                <li>
                                    <FaLocationArrow />
                                    <span>123 Main St, Anytown USA</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 175,
                            delay: 0.2,
                        }}
                        className="form-main"
                    >
                        <h3>Conact Us</h3>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <InputField
                                type="text"
                                name="first_name"
                                label="First Name"
                                icon={<FaAddressCard />}
                                handleChange={handleChange}
                            />

                            <InputField
                                type="text"
                                name="last_name"
                                label="Last Name"
                                icon={<FaAddressCard />}
                                handleChange={handleChange}
                            />

                            <InputField
                                type="email"
                                name="email"
                                label="email"
                                icon={<FaEnvelope />}
                                handleChange={handleChange}
                            />

                            <InputField
                                type="textarea"
                                name="message"
                                label="message"
                                icon={<FaInbox />}
                                handleChange={handleChange}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? <BeatLoader color="#fff" size={12} /> : "Submit"}
                            </button>
                        </form>
                        <span>
                            Wor-k-lock do not sell or trade customer information.Your privacy
                            is very important to us.
                        </span>
                    </motion.div>
                </div>

                <Wave className={"wave"} fill="#fff" />
            </div>
        </div>
    );
};

export default Contact;
