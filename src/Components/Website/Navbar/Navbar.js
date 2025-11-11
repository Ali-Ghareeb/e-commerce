import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Axios } from '../../../Api/axios';
import { CAT } from '../../../Api/Api';
import './navBar.css'
import StringSlice from '../../../helpers/StringSlice';
import SkeletonShow from '../Skeleton/SkeletoShow';
import { Cart } from '../../../Context/CartChangerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";


export default function NavBar() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prodcuts, setProdcuts] = useState([]);
    const { isChange } = useContext(Cart);
    const [count, setCount] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        Axios.get(`${CAT}`)
            .then((res) => setCategories(res.data.slice(-8)))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const getProdcuts = JSON.parse(localStorage.getItem("prodcut")) || [];
        setProdcuts(getProdcuts);
    }, [isChange]);

    const handleDelete = (id) => {
        const filterProdcut = prodcuts.filter((prodcut) => prodcut.id !== id);
        setProdcuts(filterProdcut);
        localStorage.setItem("prodcut", JSON.stringify(filterProdcut));
    }

    const changeCount = (id, btnCount) => {
        const getProdcuts = JSON.parse(localStorage.getItem("prodcut")) || [];
        const findProducts = getProdcuts.find((product) => product.id === id);
        findProducts.count = btnCount;
        localStorage.setItem("prodcut", JSON.stringify(getProdcuts));
    };

    const prodcutShow = prodcuts?.map((prodcut, key) => (
        <div className='"mb-4 position-relative' key={key}>
            <div
                onClick={() => handleDelete(prodcut.id)}
                className='position-absolute top-0 end-0 rounded-circle d-flex
                align-items-center justify-content-center bg-danger text-white'
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
            >
                <FontAwesomeIcon width="10px" icon={faXmark} />
            </div>
            <div className='d-flex align-items-start gap-2 flex-wrap'>
                <img
                    src={prodcut.images[0].image}
                    height={'80px'}
                    style={{ objectFit: "cover" }}
                    className="rounded col-sm-3 col-12"
                    alt="img"
                />
                <div className='col-sm-6 col-12'>
                </div>

                <PlusMinusBtn
                    id={prodcut.id}
                    count={prodcut.count || 1}
                    setCount={setCount}
                    changeCount={changeCount}
                />
            </div>
        </div>
    ))

    const categoriesShow = categories.map((category) => (
        <Link
            to={`/categories/${category.id}`}
            className='m-0 category-title text-black'>
            {StringSlice(category.title, 15)}
        </Link>
    ));

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>{prodcutShow}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Checkout</Button>
                </Modal.Footer>
            </Modal>
            <nav className="py-3">
                <Container>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <Link className="col-3" to="/">
                            <img
                                width="150px"
                                src={require('../../../Assets/images/Logo.png')}
                                alt='logo'
                            />
                        </Link>
                        <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
                            <Form.Control
                                type='search'
                                className='form-control custom-search py-3 rounded-0'
                                placeholder='Search Product'
                            />
                            <h3 className='btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center
                            justify-content-center'>
                                Search
                            </h3>
                        </div>
                        <div className='col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1'>
                            <div onClick={handleShow}>
                                <img
                                    width="40px"
                                    src={require('../../../Assets/images/Cart.png')}
                                    alt='cart'
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            <Link to='/profile'>
                                <img
                                    width="35px"
                                    src={require('../../../Assets/images/Profile.png')}
                                    alt='profile'
                                />
                            </Link>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex align-items-center justify-content-start gap-3'>
                            {loading ? <SkeletonShow
                                length="8"
                                height="30px"
                                width="80px"
                            />
                                : categoriesShow}
                            <Link className='text-black category-title' to='/categories'>
                                Show All
                            </Link>
                        </div>
                    </div>
                </Container>
            </nav>
        </>
    );
}