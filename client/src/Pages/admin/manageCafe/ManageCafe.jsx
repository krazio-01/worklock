import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { BsFileEarmarkImage } from "react-icons/bs";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import "./manageCafe.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCafe = ({ setShowManageCafe, showManageCafe }) => {
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [cafes, setCafes] = useState([]);
    const [fetchUpdatedCafes, setFetchUpdatedCafes] = useState(false);
    const [cafeCardDetails, setCafeCardDetails] = useState({
        img: null,
        title: "",
        desc: "",
        rating: "",
        dist: "",
    });

    const handleChange = (e) => {
        setCafeCardDetails({ ...cafeCardDetails, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setCafeCardDetails({ ...cafeCardDetails, img: e.target.files[0] });
    };

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user?.isAdmin) navigate('/login');
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("imgFile", cafeCardDetails.img);
        formData.append("title", cafeCardDetails.title);
        formData.append("desc", cafeCardDetails.desc);
        formData.append("rating", cafeCardDetails.rating);
        formData.append("dist", cafeCardDetails.dist);

        try {
            setSubmitLoading(true);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.post("admin/add-cafe", formData, config);
            setCafeCardDetails({
                img: null,
                title: "",
                desc: "",
                rating: "",
                dist: "",
            });
            toast.success(response.data);
            setFetchUpdatedCafes(true);
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleRemoveCafe = async (id) => {
        try {
            setDeleteLoading(true);
            const response = await axios.delete(`admin/remove-cafe/${id}`);
            toast.success(response.data);
            setFetchUpdatedCafes(true);
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        const fetchCafes = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("booking/fetch-cafes");
                setCafes(data);
            } catch (error) {
                toast.error(error.response.data);
            } finally {
                setLoading(false);
                setFetchUpdatedCafes(false);
            }
        };
        fetchCafes();
    }, [fetchUpdatedCafes]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="cafe-manager-container"
        >
            <div className="cafe-manager-form">
                <div className="cafe-add-form-top">
                    <FaArrowLeft onClick={() => setShowManageCafe(!showManageCafe)} />
                    <h1>Add new cafe</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="image" >
                            <BsFileEarmarkImage />
                            Add image {cafeCardDetails.img ? `- ${cafeCardDetails.img.name}` : ''}
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <input
                            type="text"
                            name="title"
                            value={cafeCardDetails.title}
                            onChange={handleChange}
                            placeholder="Cafe-name"
                        />
                        <input
                            type="text"
                            name="desc"
                            value={cafeCardDetails.desc}
                            onChange={handleChange}
                            placeholder="Cafe-description"
                        />
                        <input
                            type="number"
                            name="rating"
                            value={cafeCardDetails.rating}
                            onChange={handleChange}
                            placeholder="Cafe-rating"
                        />
                        <input
                            type="number"
                            name="dist"
                            value={cafeCardDetails.dist}
                            onChange={handleChange}
                            placeholder="Cafe-distance"
                        />
                    </div>
                    <button type="submit" disabled={submitLoading} className={submitLoading ? "cafe-submit-loading" : ""}>
                        {submitLoading ? <BeatLoader color="#fff" size={12} /> : "Add new cafe"}
                    </button>
                </form>
            </div>
            <div className="cafes-container">
                <h1>Cafes</h1>
                {loading ? (
                    <div className="cafe-loading-container">
                        <BeatLoader color="#000" size={12} />
                    </div>
                ) : (
                    cafes.map((cafe) => (
                        <div key={cafe._id} className="admin-cafe-tile">
                            <div className="admin-cafe-img">
                                <img src={cafe.img} alt={cafe.title} />
                            </div>
                            <div className="cafe-tile-info">
                                <div id="tile-above">
                                    <h3>{cafe.title}</h3>
                                    <p>{cafe.desc}</p>
                                </div>
                                <div id="tile-bottom">
                                    <div>
                                        <span>{cafe.rating}</span>
                                        <p>{cafe.dist}</p>
                                    </div>
                                    <div>
                                        <button
                                            className={deleteLoading ? "cafe-removing-loading" : ""}
                                            disabled={deleteLoading}
                                            onClick={() => handleRemoveCafe(cafe._id)}
                                        >
                                            <span>
                                                Remove <IoRemoveCircleOutline />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default ManageCafe;
