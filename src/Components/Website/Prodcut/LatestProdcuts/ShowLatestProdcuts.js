import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { Latest } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletoShow";
import SaleProdcut from "../SaleProdcuts/SaleProdcut";

export default function ShowLatestProdcuts() {
    const [prodcuts, setProdcuts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get(`${Latest}`)
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
            col="6"
        />
    ));
    return (
        <div className="col-md-6 col-12">
            <div className="ms-md-3">
                <h1>Latest Prodcuts</h1>
                <div className="d-flex align-items-strech justify-content-center flex-wrap row-ga mb-5">
                    {loading ? <SkeletonShow length="4" height="300px" classes="col-md-6 col-12" /> : prodcutShow}
                </div>
            </div>
        </div>
    );
}