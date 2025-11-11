import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function SaleProdcut(props) {
    const roundStar = Math.round(props.rating);
    const stars = Math.min(roundStar, 5);
    console.log(stars);
    const showGoldStars = Array.from({ length: stars }).map((_, index) =>
        <FontAwesomeIcon key={index} icon={solid} style={{ color: "Gold" }} />);
    const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) =>
        <FontAwesomeIcon key={index} icon={regularStar} />);
    return (
        <NavLink to={`/prodcut/${props.id}`} className={`col-lg-${props.col} col-md-6 col-12`}>
            <div className="m-1 border rounded p-3 h-100">
                <div className="border-button pb-3">
                    <p className="text-truncate" style={{ color: "gray" }}>{props.title}</p>
                    <p className="text-truncate text-black">{props.description}</p>
                    <div className="px-5 py4 position-relative">
                        {props.sale && <p
                            className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                            style={{ width: "40px", height: "40px", lineHeight: "40px", fontSize: '12px' }}>
                            Sale
                        </p>}
                        <img
                            src={props.img}
                            alt=""
                            className="img-fluid"
                        />
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2">
                    <div>
                        {showGoldStars}
                        {showEmptyStars}
                        <div className="d-flex align-items-center gap-3">
                            <h5 className="m-0 text-primary">{props.discount}$</h5>
                            <h6
                                className="m-0"
                                style={{ color: "gray", textDecoration: "line-through" }}
                            >
                                {props.price}$
                            </h6>
                        </div>
                    </div>
                    <img
                        src={require("../../../../Assets/images/Cart.png")}
                        alt="cart"
                        width="20px"
                    />
                </div>
            </div>
        </NavLink>
    );
}