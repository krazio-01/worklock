import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { BsDatabase } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import "./admin.css";

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [refreshLogs, setRefreshLogs] = useState(false);
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user?.isAdmin) navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/booking/fetch-bookings");
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [refreshLogs]);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <ul>
                    <li>
                        <button onClick={() => setRefreshLogs(!refreshLogs)}>
                            <span>
                                <TfiReload /> Refresh Logs
                            </span>
                        </button>
                    </li>
                    <li>
                        <Link to="/admin/manageCafe">
                            <span>
                                <BsDatabase /> Manage Cafes
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="misc-container">
                <div className="misc-header">
                    <h1>Bookings history</h1>
                </div>
                <div className="logs">
                    <div className="logs-header">
                        <span>Name</span>
                        <span>Cafe</span>
                        <span>Meeting Time</span>
                        <span>Booked For</span>
                        <span>Guest</span>
                        <span>Booked On</span>
                        <span>Booking Time</span>
                        <span>Amount Paid</span>
                    </div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking._id} className="log">
                                <p>{booking.name}</p>
                                <p>{booking.cafe}</p>
                                <p>{booking.time}</p>
                                <p>{dayjs(booking.date).format("DD-MM-YYYY")}</p>
                                <p>{booking.guest}</p>
                                <p>{dayjs(booking.createdAt).format("DD-MM-YYYY")}</p>
                                <p>{dayjs(booking.createdAt).format("hh:mm A")}</p>
                                <p>₹ 299</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="revenue">
                    <h1>Revenue</h1>
                </div>
            </div>
        </div>
    );
};

export default Admin;
