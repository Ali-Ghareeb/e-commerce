import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { LatestSale } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletoShow";
import { Container } from "react-bootstrap";
import SaleProdcut from "./SaleProdcut";

export default function LatestSaleProdcuts() {
    const [prodcuts, setProdcuts] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(prodcuts);
    useEffect(() => {
        Axios.get(`${LatestSale}`)
            .then((res) => setProdcuts(res.data))
            .finally(() => setLoading(false))
    }, [])

    const prodcutShow = prodcuts.map((prodcut) => (
        <SaleProdcut
            title={prodcut.title}
            description={prodcut.description}
            img={prodcut.images[0].image}
            sale
            discount={prodcut.discount}
            price={prodcut.price}
            rating={prodcut.rating}
            id={prodcut.id}
            col="3"
        />
    ));
    console.log(prodcuts);
    return (
        <Container>
            <h1>Latest Sale Prodcuts</h1>
            <div className="d-flex align-items-strech justify-content-center flex-wrap row-ga mb-5">
                {loading ? <SkeletonShow length="8" height="300px" classes="col-lg-3" /> : prodcutShow}
            </div>
        </Container>
    );
}