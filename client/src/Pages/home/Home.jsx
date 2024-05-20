import './home.css';
import { motion } from 'framer-motion';
import Services from './services/Services';
import TieUps from './tieUps/TieUps';
import Testimonials from './testimonials/Testimonials';
import Img from '../../assets/images/bg2.png';

const Home = () => {
    return (
        <>
            <div className='home'>
                <div className='container'>
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, stiffness: 100, delay: 0.3 }}
                    >
                        Get the best <span>Space</span> near you and have a free Coffee <span>Today</span>
                    </motion.h1>

                    <div className='buttons'>
                        <motion.button
                            initial={{
                                opacity: 0,
                                x: -100,
                                boxShadow: '0 12px 17px rgba(0, 0, 0, 0.2)'
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{
                                y: 5,
                                boxShadow:
                                    'none'
                            }}
                            transition={{ duration: 1, type: "spring", stiffness: 150 }}
                        >
                            BOOK NOW
                        </motion.button>
                        <motion.button
                            initial={{
                                opacity: 0,
                                x: 100,
                                boxShadow: '0 12px 17px rgba(0, 0, 0, 0.2)'
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{
                                y: 5,
                                boxShadow:
                                    'none'
                            }}
                            transition={{ duration: 1, type: "spring", stiffness: 150 }}
                        >
                            VIEW NEARBY
                        </motion.button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: .5,
                        stiffness: 200,
                        delay: 0.5
                    }}
                    className='banner-img'
                >
                    <img src={Img}></img>
                </motion.div>
            </div>

            <Services />
            <TieUps />
            <Testimonials />
        </>
    )
}

export default Home
