import { Link } from 'react-router-dom';
import './footer.css';
import { FaTwitter } from "react-icons/fa";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className='footer'>
            <div id='line'></div>

            <div className="footer-content">
                <div className="foo-info">
                    <h2>Wor-K-Lock</h2>

                    <span>
                        We're committed to securing your work environment
                    </span>

                    <div className="social-links">
                        <FaFacebookF />
                        <FaInstagram />
                        <FaTwitter />
                    </div>
                </div>

                <div className="foo-links">
                    <div>
                        <span>Our Site</span>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/'>Book Space</Link></li>
                            <li><Link to='/'>Products</Link></li>
                            <li><Link to='/'>Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <span>Resources</span>
                        <ul>
                            <li><Link to='/'>Career</Link></li>
                            <li><Link to='/'>Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <span>Contact</span>
                        <ul>
                            <li>worklock@gmail.com</li>
                            <li>+91 9352072344</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
