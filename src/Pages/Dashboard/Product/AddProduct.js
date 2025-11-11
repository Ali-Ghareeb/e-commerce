import { useEffect, useRef, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import LoadingSubmit from '../../../Components/Loading/LoadingSubmit';
import { CAT, Pro } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    //States
    const [form, setForm] = useState({
        category: "Select Category",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
        stock: 0,
    });
    const dummyForm = {
        category: null,
        title: "dummy",
        description: "dummy",
        price: 222,
        discount: 0,
        About: "About",
        stock: 0,
    }
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [id, setId] = useState("")
    const [categories, setCategories] = useState([]);


    const navigate = useNavigate();

    //Get All Categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((data) => setCategories(data.data))
            .catch(err => console.log(err))
    }, []);

    //Ref
    const focus = useRef("");
    const openImage = useRef(null);
    const progress = useRef([]);
    const ids = useRef([]);

    console.log(progress);

    //Handle Focus
    useEffect(() => {
        focus.current.focus();
    }, [])

    //Open Image Box
    function handleOpenImage() {
        openImage.current.click();
    }

    //Handle Edit
    async function handleEdit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await Axios.post(`/${Pro}/edit/${id}`, form);
            navigate('/dashboard/products');
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    //Handle Submit Form
    async function handleSubmitForm(e) {
        try {
            const res = await Axios.post(`${Pro}/add`, dummyForm);
            setId(res.data.id);
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    //handleChange
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSent(true);
        if (sent !== true) {
            handleSubmitForm();
        }
    }

    //Handle Image Changes

    const j = useRef(-1);

    async function handleImagesChange(e) {
        setImages((prev) => [...prev, ...e.target.files]);
        const imagesAsFiles = e.target.files;

        const data = new FormData();
        for (let i = 0; i < imagesAsFiles.length; i++) {
            j.current++;
            data.append("image", imagesAsFiles[i]);
            data.append("product_id", id);
            try {
                const res = await Axios.post("product-img/add", data, {
                    onUploadProgress: (ProgressEvent) => {
                        const { loaded, total } = ProgressEvent;
                        const percent = Math.floor((loaded * 100) / total);
                        if (percent % 10 === 0) {
                            progress.current[j.current].style.width = `${percent}%`;
                            progress.current[j.current].setAttribute('percent', `${percent}%`);
                        }
                    }
                });
                ids.current[j.current] = res.data.id;
            } catch (err) {
                console.log(err);
            }

        }

    }

    //Handle Delete Image
    async function handleImageDelete(id, img) {
        const findId = ids.current[id];
        try {
            const res = await Axios.delete(`product-img/${findId}`);
            setImages((prev) => prev.filter(image => image !== img))
            ids.current = ids.current.filter((i) => i !== findId)
            --j.current;
        }
        catch (err) {
            console.log(err);
        }
    }

    //Mapping
    const categoriesShow = categories.map((item, key) => (
        <option value={item.id} key={key}>
            {item.title}
        </option>
    ));

    const imagesShow = images.map((img, key) => (
        <div key={key} className='border p-2 w-100 mb-2'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center justify-content-start gap-2'>
                    <img src={URL.createObjectURL(img)} width='80px' />
                    <div>
                        <p className='mb-1'>{img.name}</p>
                        <p>{(img.size / 1024 < 900 ?
                            (img.size / (1024)).toFixed(2) + " Kb"
                            : (img.size / (1024 * 1024)).toFixed(2) + " Mb")}
                        </p>
                    </div>
                </div>
                <Button onClick={() => handleImageDelete(key, img)} variant='danger'>Delete</Button>
            </div>
            <div className='custom-progress mt-3'>
                <span
                    ref={(e) => (progress.current[key] = e)}
                    className='inner-progress'>
                </span>
            </div>
        </div>
    ));
    return (
        <>
            {loading && <LoadingSubmit />}
            <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        ref={focus}
                        name='category'
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option disabled>Select Category</option>
                        {categoriesShow}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title..."
                        required
                        disabled={!sent}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description..."
                        required
                        disabled={!sent}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        name='price'
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price..."
                        required
                        disabled={!sent}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                        type="text"
                        name='discount'
                        value={form.discount}
                        onChange={handleChange}
                        placeholder="Discount..."
                        required
                        disabled={!sent}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="About">
                    <Form.Label>About</Form.Label>
                    <Form.Control
                        type="text"
                        name='About'
                        value={form.About}
                        onChange={handleChange}
                        placeholder="About..."
                        required
                        disabled={!sent}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        disabled={!sent}
                        type="text"
                        name='stock'
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Stock..."
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="images">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                        type="file"
                        ref={openImage}
                        hidden
                        multiple
                        disabled={!sent}
                        onChange={handleImagesChange}
                    />
                </Form.Group>
                <div
                    onClick={handleOpenImage}
                    className='d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column'
                    style={{ border: !sent ? "2px dashed gray" : "2px dashed #0086fe", cursor: sent && "pointer" }}
                >
                    <img
                        src={require('../../../Assets/images/upload.png')}
                        style={{ filter: !sent && "grayscale(1)" }}
                        alt='Upload Here'
                        width="100px"
                    />
                    <p
                        className='fw-bold mb-0'
                        style={{ color: !sent ? "gray" : "#0086fe" }}
                    >
                        Upload Images
                    </p>
                </div>
                <div className='d-flex align-items-start flex-column gap-2'>
                    {imagesShow}
                </div>

                <button className="btn btn-primary mt-2">Save</button>
            </Form>
        </>
    );
}



let test = { a: 1, b: 2 };
for (let jk = 0; jk < test.length; jk++) {
    console.log(`ok ${jk}`);;
}
let test1 = {};




