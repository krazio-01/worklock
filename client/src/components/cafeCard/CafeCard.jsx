import "./cafeCard.css";
import { FaRegStar, FaCheckCircle } from "react-icons/fa";

const CoffeeCard = ({ cafe, onSelect, isSelected }) => {
    // const { IMG, TITLE, desc, rating, dist, onSelect, isSelected } = props;

    return (
        <div className="card" onClick={onSelect}>
            {isSelected && <FaCheckCircle className="checkIcon" />}
            <div className="card-img">
                <img src={cafe.img} />
            </div>

            <div className="discription">
                <div id="tr">
                    <h3>{cafe.title}</h3>
                    <span>
                        {cafe.rating} <FaRegStar />
                    </span>
                </div>
                <div id="dk">
                    <p>{cafe.desc}</p>
                    <span>{cafe.dist} KM</span>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;
