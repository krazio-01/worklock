import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import axios from "axios";
import './tieUps.css';
import CafeCard from '../../../components/cafeCard/CafeCard';

const TieUps = () => {
    const [loading, setLoading] = useState(false);
    const [cafes, setCafes] = useState([]);

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
            }
        };
        fetchCafes();
    }, []);

    return (
        <div className='tieup'>
            <div className="tieup-header">
                <motion.h2
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.7, once: true }}
                    transition={{ delay: 0.4 }}
                >
                    Cafe's Tie Ups
                </motion.h2>
            </div>

            <div className="tieup-items">
                {
                    cafes.map((cafe, index) => {
                        return (
                            <ProductItem key={index} cafe={cafe} delay={index * 0.1} />
                        )
                    })
                }
            </div>
        </div>
    )
}

const ProductItem = ({ cafe, delay }) => {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
            transition={{ type: 'spring', stiffness: 100, duration: 0.7, delay: delay }}
        >
            <CafeCard
                key={cafe.id}
                cafe={cafe}
            />
        </motion.div>
    );
}

export default TieUps;
