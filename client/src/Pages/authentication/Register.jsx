import { useState } from "react";
import axios from "axios";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPass: "",
	});

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
			await axios.post(
				"/auth/register",
				formData
			);

			toast.success("Registration successful");
			toast.success("A verification email send to your registered email", {
				autoClose: false,
			});
		} catch (err) {
			if (err.response && err.response.data && err.response.data.Error) {
				toast.error(err.response.data.Error);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-form-container sign-up">
			<form onSubmit={handleSubmit}>
				<h2>
					<Link to="/">Wor-K-Lock</Link>
				</h2>
				<h2>Create Account</h2>
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
				<span>or use your email for registration</span>
				<input
					type="text"
					placeholder="Name"
					name="name"
					onChange={handleChange}
				/>
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
				<input
					type="password"
					placeholder="Confirm Password"
					name="confirmPass"
					onChange={handleChange}
				/>
				<button disabled={loading} type="submit">
					{loading ? "Singing up..." : "Sign Up"}
				</button>
			</form>
		</div>
	);
};

export default Register;
