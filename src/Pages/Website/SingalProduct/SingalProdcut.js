import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import { CART, Pro, } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletoShow";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";

export default function SingalProdcut() {
    const [prodcut, setProdcut] = useState({});
    const [count, setCount] = useState(5);
    const [prodcutImages, setProdcutImages] = useState([]);
    const [error, setError] = useState("");
    const [loadingCart, setLoadingCart] = useState(false);
    const [loading, setLoading] = useState(true);
    const { setIsChange } = useContext(Cart);
    const { id } = useParams();

    console.log(prodcut);

    const roundStar = Math.round(prodcut.rating);
    const stars = Math.min(roundStar, 5);
    const showGoldStars = Array.from({ length: stars }).map((_, index) =>
        <FontAwesomeIcon key={index} icon={solid} style={{ color: "Gold" }} />);
    const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) =>
        <FontAwesomeIcon key={index} icon={regularStar} />);

    useEffect(() => {
        Axios.get(`${Pro}/${id}`)
            .then((res) => {
                setProdcutImages(res.data[0].images.map((img) => {
                    return { original: img.image, thumbnail: img.image };
                })
                );
                setProdcut(res.data[0]);
            })
            .finally(() => setLoading(false))
    }, []);

    const checkStock = async () => {
        try {
            setLoadingCart(true);
            const getItems = JSON.parse(localStorage.getItem("prodcut")) || [];
            const prodcutCount = getItems.filter((item) => item.id == id)?.[0]?.count;

            await Axios.post(`${CART}/check`, {
                product_id: prodcut.id,
                count: count + (prodcutCount ? prodcutCount : 0),
            })
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        } finally {
            setLoadingCart(false);
        }
    }

    const handleSave = async () => {
        const check = await checkStock();
        if (check) {
            const getItems = JSON.parse(localStorage.getItem("prodcut")) || [];

            const prodcutExist = getItems.findIndex((pro) => pro.id == id);

            if (prodcutExist !== -1) {
                if (getItems[prodcutExist].count) {
                    getItems[prodcutExist].count += count;
                } else {
                    getItems[prodcutExist].count = count;
                }
            } else {
                if (count > 1) {
                    prodcut.count = count;
                }
                getItems.push(prodcut);
            }

            localStorage.setItem('prodcut', JSON.stringify(getItems));
            setIsChange((prev) => !prev);
            console.log(prodcutExist);
        }
    };

    return (
        <Container className="mt-5">
            <div className="d-flex align-items-start flex-wrap">
                {loading ? (
                    <>
                        <div className="col-lg-4 col-md-6 col-12">
                            <SkeletonShow
                                height="250px"
                                length="1"
                                classes="col-12"
                            />{" "}
                            <div className="col-12 d-flex mt-1">
                                <SkeletonShow height="100px" length="1" classes="col-4" />
                                <SkeletonShow height="100px" length="1" classes="col-4" />
                                <SkeletonShow height="100px" length="1" classes="col-4" />
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-6 col-12">
                            <div className="ms-lg-5">
                                <SkeletonShow
                                    height="20px"
                                    length="1"
                                    classes="col-lg-8 col-12"
                                />{" "}
                                <SkeletonShow
                                    height="210px"
                                    length="1"
                                    classes="col-lg-8 col-12 mt-2"
                                />{" "}
                                <hr className="col-lg-8 col-12" />
                                <div className="d-flex align-items-center justify-content-between col-lg-8 col-12">
                                    <SkeletonShow
                                        height="20px"
                                        length="1"
                                        classes="col-4 mt-2"
                                    />{" "}
                                    <SkeletonShow
                                        height="20px"
                                        length="1"
                                        classes="col-4 mt-2"
                                    />{" "}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col-lg-4 col-md-6 col-12">
                            <ImageGallery items={prodcutImages} />
                        </div>
                        <div className="col-lg-8 col-md-6 col-12">
                            <div className="ms-5">
                                <h1>{prodcut.title}</h1>
                                <p style={{ color: "gray" }}>{prodcut.About}</p>
                                <h3 className="fw-normal">{prodcut.description}</h3>

                                <div className="d-flex align-items-center justify-content-between pt-4 border-top">
                                    <div>
                                        {prodcut.stock === 1 && (
                                            <p className="text-danger">There is only 1 left</p>
                                        )}
                                        {showGoldStars}
                                        {showEmptyStars}
                                        <div className="d-flex align-items-center gap-3">
                                            <h5 className="m-0 text-primary">{prodcut.discount}$</h5>
                                            <h6
                                                className="m-0"
                                                style={{ color: "gray", textDecoration: "line-through" }}
                                            >
                                                {prodcut.price}$
                                            </h6>
                                        </div>
                                    </div >
                                    <div className="d-flex align-items-center gap-4">
                                        <PlusMinusBtn setCount={(data) => setCount(data)} />
                                        <div style={{ cursor: "pointer" }} onClick={handleSave} className="border p-2 rounded">
                                            {loadingCart ? ("Loading") : (
                                                <img
                                                    src={require("../../../Assets/images/Cart.png")}
                                                    alt=""
                                                    width="20px"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </Container>
    );
}