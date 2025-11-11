import { useEffect, useRef, useState } from "react";
import { USER } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSubmit from "../../../Components/Loading/LoadingSubmit";

export default function User() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const focus = useRef(null);

    useEffect(() => {
        focus.current.focus();
        console.log(focus);
    }, [])

    const nav = useNavigate();

    useEffect(() => {
        setLoading(true);
        Axios.get(`/${USER}/${id}`)
            .then((data) => {
                setLoading(false);
                setName(data.data.name);
                setEmail(data.data.email);
                setRole(data.data.role);
            }).then(() => setDisable(false))
            .catch(() => nav('/dashboard/users/page/404', { replace: true }))
    }, []);

    //Handle Submit
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await Axios.post(`/${USER}/edit/${id}`, {
                name: name,
                email: email,
                role: role,
            });
            window.location.pathname = '/dashboard/users';
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
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text" value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name.."
                        required
                        ref={focus}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required >
                        <option value="" disabled>Select Role</option>
                        <option value="1995">Admin</option>
                        <option value="2001">User</option>
                        <option value="1996">Writer</option>
                    </Form.Select>
                </Form.Group>
                <button disabled={disable} className="btn btn-primary">Save</button>
            </Form>
        </>
    );
}