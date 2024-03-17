import { useState } from "react";
import axios from "axios";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "/auth/login",
                formData
            );

            if (response.status === 200) {
                if (
                    response.data.isVerified === false &&
                    response.data.emailToken !== null
                ) {
                    toast.error("Please verify your account first to login");
                    setLoading(false);
                    return;
                }

                localStorage.setItem("user", JSON.stringify(response.data));
                toast.success("Login successful!");
                navigate("/");
            } else toast.error("Invalid credentials!");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.Error) {
                toast.error(err.response.data.Error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container sign-in">
            <form onSubmit={handleSubmit}>
                <h2>
                    <Link to="/">Wor-K-Lock</Link>
                </h2>
                <h2>Sign In</h2>
                <div className="social-icons">
                    <Link to="/google">
                        <FaGoogle />
                    </Link>
                    <Link to="/facebook">
                        <FaFacebook />
                    </Link>
                    <Link to="/github">
                        <FaGithub />
                    </Link>
                </div>
                <span>or use your email password</span>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                <Link to="/forgot">Forgot Your Password?</Link>
                <button type="submit" disabled={loading}>
                    {loading ? <BeatLoader color="#fff" size={7} /> : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default Login;
