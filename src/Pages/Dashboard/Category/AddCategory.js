import { useEffect, useRef, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import LoadingSubmit from '../../../Components/Loading/LoadingSubmit';
import { Cat } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';

export default function AddCategory() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    //Ref
    const focus = useRef("");

    //Handle Focus
    useEffect(() => {
        focus.current.focus();
    }, [])

    //Handle Submit
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('image', image);
        try {
            const res = await Axios.post(`${Cat}/add`, form);
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
                    <Form.Control ref={focus} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <FormControl onChange={(e) => setImage(e.target.files.item(0))} type="file"></FormControl>
                </Form.Group>
                <button disabled={title.length > 0 ? false : true} className="btn btn-primary">Save</button>
            </Form>
        </>
    );
}
