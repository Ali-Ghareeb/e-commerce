import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/LoadingSubmit";
import Cookie from "cookie-universal";
import { Form } from 'react-bootstrap';

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const focus = useRef(null);

    useEffect(() => {
        console.log(focus);;
    }, [])


    //Loading
    const [loading, setLoading] = useState(false);

    //Cookies
    const cookie = Cookie();

    //Error
    const [err, setErr] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`${baseURL}/${LOGIN}`, form);
            setLoading(false);
            const token = res.data.token;
            const role = res.data.user.role;
            const go = role === '1995' ? 'users' : 'writer';
            cookie.set("e-commerce_R", token);
            window.location.pathname = `/dashboard/${go}`;
        }
        catch (err) {
            setLoading(false);
            if (err.response.status === 401) {
                setErr("Wrong Email or Password");
            } else {
                setErr("Internal sever error");
            };
        }
    }

    return (
        <>
            {loading && <LoadingSubmit />}
            <div className="container">
                <div className="row" style={{ height: "100vh" }}>
                    <Form className="form" onSubmit={handleSubmit}>
                        <div className="custom-form">
                            <h1>Login Now</h1>
                            <Form.Group className="form-custom">
                                <Form.Control
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter Your Email.."
                                    required
                                    style={{ outline: "none", }}
                                    ref={focus}
                                />
                                <Form.Label>Email: </Form.Label>
                            </Form.Group>
                            <Form.Group className="form-custom">
                                <Form.Control
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter Your Password.."
                                    required
                                    minLength={"6"}
                                />
                                <Form.Label>Password: </Form.Label>
                            </Form.Group>
                            <button className="btn btn-primary">Login</button>
                            <div className="google-btn">
                                <a href={`http://127.0.0.1:8000/login-google`}>
                                    <div className="google-icon-wrapper">
                                        <img
                                            className="google-icon"
                                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                            alt="sign in with google"
                                        />
                                    </div>
                                    <p className="btn-text">
                                        <b>Sign in with google</b>
                                    </p>
                                </a>
                            </div>
                            {err !== "" && <span className="error">{err}</span>}
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}