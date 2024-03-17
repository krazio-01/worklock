import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import './tieUps.css';
import CafeCard from '../../../components/cafeCard/CafeCard';
import Item1 from '../../../assets/images/cafe1.jpg';
import Item2 from '../../../assets/images/cafe2.jpg';
import Item3 from '../../../assets/images/cafe3.jpg';
import Item4 from '../../../assets/images/cafe4.jpg';
import Item5 from '../../../assets/images/cafe5.jpg';
import Item6 from '../../../assets/images/cafe6.jpg';
import Item7 from '../../../assets/images/cafe7.jpg';
import Item8 from '../../../assets/images/cafe8.jpg';

const cardDetails = [
    {
        IMG: Item1,
        TITLE: 'Love Over Coffee',
        desc: 'Where connections deepen, shared over steaming cups and whispered conversations. ',
        rating: 4.9,
        dist: 2
    },
    {
        IMG: Item2,
        TITLE: 'Nothing Before Coffee',
        desc: 'Fueling your mornings with robust espressos before facing the day.',
        rating: 4.8,
        dist: 3
    },
    {
        IMG: Item3,
        TITLE: 'Cafeholic',
        desc: 'A haven for coffee devotees, offering a symphony of flavors and brewing techniques.',
        rating: 4.7,
        dist: 4.1
    },
    {
        IMG: Item4,
        TITLE: "Mug's n Magic",
        desc: 'Where every mug holds a touch of magic, created with expertly crafted Americanos and other coffee delights.',
        rating: 4.6,
        dist: 1.3
    },
    {
        IMG: Item5,
        TITLE: 'Chai Sutta Darbaar',
        desc: 'Imbibe in aromatic chai and engage in captivating conversations in this welcoming space.',
        rating: 4.5,
        dist: 2.5
    },
    {
        IMG: Item6,
        TITLE: "GVD Soni's Cafe",
        desc: 'A cafe steeped in tradition and warmth, named after its passionate owner/founder.',
        rating: 4.4,
        dist: 3.6
    },
    {
        IMG: Item7,
        TITLE: 'Morish',
        desc: 'Irresistibly delicious coffees that leave you wanting more.',
        rating: 4.6,
        dist: 5
    },
    {
        IMG: Item8,
        TITLE: 'Bulb Cafe',
        desc: 'Brightening your day with a cup of joe, like the illuminating glow of a bulb.',
        rating: 4.8,
        dist: 1
    }
]

const TieUps = () => {
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
                    cardDetails.map((item, index) => {
                        return (
                            <ProductItem key={index} {...item} delay={index * 0.2} />
                        )
                    })
                }
            </div>
        </div>
    )
}

const ProductItem = ({ IMG, TITLE, desc, rating, dist, delay }) => {
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
            <CafeCard IMG={IMG} TITLE={TITLE} desc={desc} rating={rating} dist={dist} />
        </motion.div>
    );
}

export default TieUps;
