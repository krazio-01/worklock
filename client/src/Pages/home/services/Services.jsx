import './services.css';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { BsCupHot } from "react-icons/bs";
import { GiRoundTable } from "react-icons/gi";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Services = () => {
    const { ref: headerRef, inView: headerInView } = useInView({
        threshold: 0,
        triggerOnce: true
    });

    return (
        <div className='services'>

            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 100 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100, delay: 0.3 }}
                className='services-header'
            >
                <div></div>
                <h1>Benefits Using Our Service</h1>
            </motion.div>

            <div className="items">
                <ServiceItem icon={<GiRoundTable />} title="Effortless Seat Reservation" description="Secure your seat conveniently, anytime, from anywhere. Our user-friendly booking system ensures a seamless reservation process." delay={0.4} />

                <ServiceItem icon={<BsCupHot />} title="Premium Quality" description="Indulge in excellence with our premium ingredients, thoughtfully selected to guarantee remarkable flavors and absolute freshness." delay={0.6} />
                
                <ServiceItem icon={<FaMoneyCheckAlt />} title="Unbeatable Prices" description="Experience unparalleled affordability without compromising on the excellence of your dining journey. Exceptional value awaits you." delay={0.8} />
            </div>
        </div>
    )
}

const ServiceItem = ({ icon, title, description, delay }) => {
    const { ref, inView } = useInView({
        threshold: 0.9,
        triggerOnce: true
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 200, delay: delay }}
            className="item"
        >
            {icon}
            <div id='card-content'>
                <h3>{title}</h3>
                <div>{description}</div>
            </div>
        </motion.div>
    );
}

export default Services;
