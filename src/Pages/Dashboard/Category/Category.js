import { useEffect, useRef, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Cat } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSubmit from '../../../Components/Loading/LoadingSubmit';

export default function Category() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    //Id
    // const id = Number(window.location.pathname.replace("/dashboard/categories/", ""));
    const { id } = useParams();

    const focus = useRef(null);

    useEffect(() => {
        focus.current.focus();
    }, [])

    const nav = useNavigate();

    useEffect(() => {
        setLoading(true);
        Axios.get(`/${Cat}/${id}`)
            .then((data) => {
                setTitle(data.data.title);
                setLoading(false);
            }).then(() => setDisable(false))
            .catch(() => nav('/dashboard/categories/page/404', { replace: true }))
    }, []);
    //Handle Submit
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('image', image);
        try {
            const res = await Axios.post(`/${Cat}/edit/${id}`, form);
            window.location.pathname = '/dashboard/categories';
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }
    return (
        <>
            {loading && <LoadingSubmit />}
            <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." required ref={focus} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <FormControl onChange={(e) => setImage(e.target.files.item(0))} type="file"></FormControl>
                </Form.Group>
                <button disabled={disable} className="btn btn-primary">Save</button>
            </Form>
        </>
    );
}