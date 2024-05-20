import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Person1 from "../../../assets/images/person1.jpg";
import Person2 from "../../../assets/images/person2.jpg";
import Person3 from "../../../assets/images/person3.jpg";
import Person4 from "../../../assets/images/person4.jpg";
import "./testimonials.css";

const Testimonials = () => {
    const [isFlipped, setIsFlipped] = useState(Array(4).fill(false));
    const [isAnimating, setIsAnimating] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const handleFlip = (index) => {
        if (!isAnimating) {
            const newFlippedState = [...isFlipped];
            newFlippedState[index] = !newFlippedState[index];
            setIsFlipped(newFlippedState);
            setIsAnimating(true);
        }
    };

    const cardImages = [Person1, Person2, Person3, Person4];

    const cardDescriptions = [
        {
            name: "Ram",
            text: "Review of Ram, just random text",
        },
        {
            name: "Clair",
            text: "Review of Clair, just random text",
        },
        {
            name: "Sara",
            text: "Review of Sara, just random text",
        },
        {
            name: "Liza",
            text: "Review of Liza, just random text",
        },
    ];

    return (
        <div className="testimonial" style={{ overflow: "hidden" }}>
            <div className="testimonials-header">
                <h1>Testimonials</h1>
            </div>

            <div className="testimonials-container">
                {[0, 1, 2, 3].map((index) => (
                    <motion.div
                        ref={ref}
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: index * 0.2 }}
                        className="testimonial-card"
                        onClick={() => handleFlip(index)}
                    >
                        <motion.div
                            className="card-content"
                            initial={false}
                            animate={{ rotateY: isFlipped[index] ? 180 : 360 }}
                            transition={{ duration: 0.5, animationDirection: "normal" }}
                            onAnimationComplete={() => setIsAnimating(false)}
                        >
                            <div className="card-front">
                                <div className="tt-pic">
                                    <img src={cardImages[index]} alt="" />
                                </div>
                                <div className="testimonial-name">
                                    <span>{cardDescriptions[index].name}</span>
                                </div>
                            </div>
                            <div className="card-back">
                                <p className="testimonial-text">
                                    {cardDescriptions[index].text}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
