import { useEffect, useRef, useState } from 'react';
import { Button, Form, } from 'react-bootstrap';
import { baseURL, CAT, Pro } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSubmit from '../../../Components/Loading/LoadingSubmit';

export default function Prodcut() {
    const [form, setForm] = useState({
        category: "",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
    });

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagesFromServer, setImagesFromServer] = useState([]);
    const [idsFromServer, setIdsFromServer] = useState([]);
    const { id } = useParams();
    const [categories, setCategories] = useState([]);

    const nav = useNavigate();

    console.log(idsFromServer);

    //Ref
    const focus = useRef("");
    const openImage = useRef(null);
    const progress = useRef([]);
    const ids = useRef([]);

    //Handle Focus
    useEffect(() => {
        focus.current.focus();
    }, [])

    //Get Data
    useEffect(() => {
        Axios.get(`/${Pro}/${id}`)
            .then((data) => {
                setForm(data.data[0]);
                setImagesFromServer(data.data[0].images)
            })
            .catch((err) => console.log(err))
    }, []);

    //handleOpenImage
    function handleOpenImage() {
        openImage.current.click()
    }

    //HandleChange
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    //Get All Categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((data) => setCategories(data.data))
            .catch((err) => console.log(err))
    }, []);

    //Handle Edit
    async function handleEdit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            for (let i = 0; i < idsFromServer.length; i++) {
                await Axios.delete(`product-img/${idsFromServer[i]}`)
                    .then((data) => console.log(data));
            }
            await Axios.post(`/${Pro}/edit/${id}`, form);
            nav('/dashboard/products');
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }


    //Handle Images Change

    const j = useRef(-1);

    async function handleImagesChange(e) {
        setImages((prev) => [...prev, ...e.target.files]);
        const imagesAsFiles = e.target.files;
        const data = new FormData();
        for (let i = 0; i < imagesAsFiles.length; i++) {
            j.current++
            data.append("image", imagesAsFiles[i]);
            data.append("product_id", id);
            try {
                const res = await Axios.post("/product-img/add", data, {
                    onUploadProgress: (ProgressEvent) => {
                        const { loaded, total } = ProgressEvent;
                        const percent = Math.floor((loaded * 100) / total);
                        if (percent % 10 === 0) {
                            progress.current[j.current].style.width = `${percent}%`;
                            progress.current[j.current].setAttribute('percent', `${percent}%`);
                        }
                    },
                })
                ids.current[j.current] = res.data.id;
            } catch (err) {
                console.log(err);
            }
        }
    }
    //Handle Image Delete
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

    //Handle Image Delete From Server
    async function handleDeletImageFromServer(id) {
        setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
        setIdsFromServer((prev) => {
            return [...prev, id]
        })
    }

    //Mapping
    const categoriesShow = categories.map((item, key) =>
        <option key={key} value={item.id}>{item.title}</option>
    )

    const imagesShow = images.map((img, key) => (
        <div className='border p-2 w-100'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center justify-content-start gap-2'>
                    <img alt='' src={URL.createObjectURL(img)} width="80px" />
                    <div>
                        <p className='mb-1'>{img.name}</p>
                        <p>{img.size / 1024 < 900 ? (img.size / 1024).toFixed(2) + " KB" : (img.size / (1024 * 1024)).toFixed(2) + " MB"}</p>
                    </div>
                </div>
                <Button onClick={() => handleImageDelete(key, img)} variant='danger'>Delete</Button>
            </div>
            <div className='custom-progress mt-3'>
                <span ref={(e) => (progress.current[key] = e)}
                    style={{ width: `${progress[key]}%` }}
                    className='inner-progress'></span>
            </div>
        </div>
    ))
    const imagesFromServerShow = imagesFromServer.map((img, key) => (
        <div className='border p-2 col-2 position-relative'>
            <div className='d-flex align-items-center justify-content-start gap-2'>
                <img key={key} alt='' src={img.image} className='w-100'></img>
            </div>
            <div
                style={{ cursor: "pointer" }}
                className='position-absolute top-0 end-0 bg-danger rounded text-white'>
                <p className='py-1 px-2 m-0' onClick={() => handleDeletImageFromServer(img.id)}>x</p>
            </div>
        </div>
    ))
    return (
        <>
            {loading && <LoadingSubmit />}
            <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Category</Form.Label>
                    <Form.Select ref={focus} name='category' value={form.category} onChange={handleChange} >
                        <option value="" disabled>Select Category</option>
                        {categoriesShow}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' value={form.title} onChange={handleChange} placeholder="Title..." required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name='description' value={form.description} onChange={handleChange} placeholder="Description..." required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name='price' value={form.price} onChange={handleChange} placeholder="Price..." required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="text" name='discount' value={form.discount} onChange={handleChange} placeholder="Discount..." required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                    <Form.Label>About</Form.Label>
                    <Form.Control type="text" name='About' value={form.About} onChange={handleChange} placeholder="About..." required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="text" name='stock' value={form.stock} onChange={handleChange} placeholder="Stock..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="file" ref={openImage} multiple hidden onChange={handleImagesChange} />
                </Form.Group>
                <div onClick={handleOpenImage}
                    className='d-flex align-items-center flex-column gap-2 py-3 rounded mb-2 w-100 flex-column'
                    style={{ border: "2px dashed #0086fe", cursor: "pointer" }}>
                    <img src={require('../../../Assets/images/upload.png')} width={"100px"} alt='Upload Here' />
                    <p className='fw-bold mb-0' style={{ color: "#0086fe" }}>Upload Images</p>
                </div>
                <div className='d-flex align-items-start flex-Wrap gap-2'>
                    {imagesFromServerShow}
                </div>
                <div className='d-flex align-items-start flex-column gap-2'>
                    {imagesShow}
                </div>
                <button className="btn btn-primary mt-2">Save</button>
            </Form>
        </>
    );
}

