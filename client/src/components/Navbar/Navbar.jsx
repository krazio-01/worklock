import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Img from "../../assets/images/img1.png";
import defaultUserImg from "../../assets/images/default_user.jpeg";
import { FaRegUser, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsDatabaseAdd } from "react-icons/bs";

const Menus = [
    { name: "Home", link: "/" },
    { name: "Book Your Space", link: "/booking" },
    { name: "Food", link: "/food" },
    { name: "Contact", link: "/contact" },
]

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUser(userInfo);
    }, []);

    const handleSignOut = useCallback(() => {
        localStorage.removeItem("user");
        setShowProfile(false);
        setUser(null);
        window.location.reload();
    }, []);

    return (
        <div className="nav">
            <div className="nav-container">
                <div className="nav-starter">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 250 }}
                        className="nav-hamburger"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <GiHamburgerMenu />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 250 }}
                        className="nav-logo"
                    >
                        <img src={Img} alt="logo" />
                        <NavLink to="/" onClick={() => setShowMenu(false)}>Wor-K-Lock</NavLink>
                    </motion.div>
                </div>
                <div className={"nav-links" + (showMenu ? " mobile-view" : "")}>
                    <ul>
                        {Menus.map(({ name, link }, i) => (
                            <motion.li
                                key={name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 250,
                                    delay: i * 0.2,
                                }}
                            >
                                <NavLink
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                    to={link}
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    {name}
                                </NavLink>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 250,
                        delay: 1,
                    }}
                    className="nav-cart"
                >
                    {user ? (
                        <div
                            className="nav-profile-icon"
                            onClick={() => setShowProfile(!showProfile)}
                        >
                            <img src={defaultUserImg} alt="user" />
                        </div>
                    ) : (
                        <NavLink to="/login" className="auth-link">
                            Login <FaRegUser />
                        </NavLink>
                    )}
                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="nav-profile"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.2 }}
                                    className="nav-profile-info"
                                >
                                    <span>Hey {user?.name} !</span>
                                    <div></div>
                                </motion.div>

                                <ul>
                                    <motion.li
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: 0.35 }}
                                    >
                                        <NavLink to="/manage" onClick={() => setShowProfile(false)}><FaTasks /> Manage Booking</NavLink>
                                    </motion.li>
                                    {user.isAdmin && (
                                        <motion.li
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2, delay: 0.35 }}
                                        >
                                            <NavLink to="/admin" onClick={() => setShowProfile(false)}><BsDatabaseAdd /> Admin</NavLink>
                                        </motion.li>
                                    )}
                                </ul>

                                <motion.button
                                    onClick={handleSignOut}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.5 }}
                                >
                                    <p><FaSignOutAlt /> Sign Out</p>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Navbar;
