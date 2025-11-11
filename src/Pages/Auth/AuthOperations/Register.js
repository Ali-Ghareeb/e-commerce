import axios from "axios";
import { useState } from "react";
import { baseURL, REGISTER } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/LoadingSubmit";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })

    //Loading
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
            const res = await axios.post(`${baseURL}/${REGISTER}`, form);
            setLoading(false);
            const token = res.data.token;
            cookie.set("e-commerce_R", token);
            navigate("/dashboard", { replace: true });
        }
        catch (err) {
            setLoading(false);
            if (err.response.status === 422) {
                setErr("Email is already been taken");
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
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="custom-form">
                            <h1>Register Now</h1>
                            <div className="form-custom">
                                <input id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter Your Name..."
                                    required
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-custom">
                                <input id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter Your Email..."
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-custom">
                                <input id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter Your Password..."
                                    required
                                    minLength="6"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn btn-primary">Register</button>
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
                    </form>
                </div>
            </div>
        </>
    );
}