import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { motion } from 'framer-motion';
import './auth.css';

const Auth = () => {
    const [active, setActive] = useState(false);

    return (
        <div className='auth-container'>
            <motion.div
                initial={{ opacity: 0, y: -150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, duration: 1 }}
                className={`auth-wrapper ${active ? 'active' : ''}`}
            >
                <Login />
                <Register />
                <div className='toggle-container'>
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h2>Welcome Back!</h2>
                            <p>Enter your personal details to book your space</p>
                            <button
                                onClick={() => setActive(!active)}
                                className='hidden'
                            >
                                Sign In
                            </button>
                        </div>

                        <div className="toggle-panel toggle-right">
                            <h2>Hey There!</h2>
                            <p>Register with your personal details to get started</p>
                            <button
                                onClick={() => setActive(!active)}
                                className='hidden'
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Auth;
