import "./cafeCard.css";
import { FaRegStar, FaCheckCircle } from "react-icons/fa";

const CoffeeCard = (props) => {
    const { IMG, TITLE, desc, rating, dist, onSelect, isSelected } = props;

    return (
        <div className="card" onClick={onSelect}>
            {isSelected && <FaCheckCircle className="checkIcon" />}
            <div className="card-img">
                <img src={IMG} />
            </div>

            <div className="discription">
                <div id="tr">
                    <h3>{TITLE}</h3>
                    <span>
                        {rating} <FaRegStar />
                    </span>
                </div>
                <div id="dk">
                    <p>{desc}</p>
                    <span>{dist} KM</span>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;
