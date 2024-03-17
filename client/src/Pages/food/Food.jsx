import React, { useRef, useState, useCallback } from 'react';
import './food.css';
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Food1 from '../../assets/images/foodItem1.png';
import Food2 from '../../assets/images/foodItem2.png';
import Food3 from '../../assets/images/foodItem3.png';
import Food4 from '../../assets/images/foodItem4.png';
import Food5 from '../../assets/images/foodItem5.png';

const foodItems = [
    { name: "Burger", image: Food1 },
    { name: "Pizza", image: Food2 },
    { name: "French fries", image: Food3 },
    { name: "Sandwich", image: Food4 },
    { name: "Mojito", image: Food5 },
];

const Food = () => {
    const carousel = useRef();
    const [imageWidth, setImageWidth] = useState(null);

    const handleImageLoad = useCallback((event) => {
        if (!imageWidth) {
            setImageWidth(event.target.clientWidth + 128);
        }
    }, [imageWidth]);

    const handleClick = useCallback((direction) => {
        carousel.current.scrollLeft += direction === "left" ? -imageWidth : imageWidth;
    }, [imageWidth]);

    return (
        <div className='food-container'>
            <div className='food-items' ref={carousel}>
                {foodItems.map(({ name, image }, index) => (
                    <motion.img
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 100, duration: 0.7, delay: index * 0.1 }}
                        key={index}
                        src={image}
                        alt={name}
                        draggable='false'
                        onLoad={index === 0 ? handleImageLoad : null}
                    />
                ))}
            </div>

            <div id='left-arrow' onClick={() => handleClick("left")}>
                <FaArrowLeft />
            </div>

            <div id='right-arrow' onClick={() => handleClick("right")}>
                <FaArrowRight />
            </div>
        </div>
    );
};

export default Food;
