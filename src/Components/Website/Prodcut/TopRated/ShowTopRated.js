import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { TopRatedApi } from "../../../../Api/Api";
import TopRated from "./TopRated";
import SkeletonShow from "../../Skeleton/SkeletoShow";


export default function ShowTopRated() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get(`${TopRatedApi}`)
            .then((res) => setProducts(res.data))
            .finally(() => setLoading(false))
    }, [])

    const productShow = products.map((product) => (
        <TopRated
            title={product.title}
            description={product.description}
            img={product.images[0].image}
            sale
            discount={product.discount}
            price={product.price}
            rating={product.rating}
            id={product.id}
        />
    ));
    // console.log(products);
    return (
        <div className="col-md-6 col-12" style={{ border: "2px solid #0D6EFD" }}>
            <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
            <div className="p-5">{loading ? <SkeletonShow length="1" height="800px" classes="col-12" /> : productShow}</div>
        </div>
    );
}