import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/LoadingSubmit";
import { Axios } from "../../../Api/axios";
import Error403 from "../Errors/403";


export default function RequireAuth({ allowedRole }) {

    //User
    const [user, setUser] = useState("");

    //Token & Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce_R");

    //Navigate
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`/${USER}`)
            .then((data) => setUser(data.data))
            .catch(() => navigate("/login", { replace: true }));
    }, []);

    return token ? (user === "" ? <LoadingSubmit />
        : (
            allowedRole.includes(user.role) ?
                <Outlet /> :
                <Error403 role={user.role} />)) :
        <Navigate to={'/login'} replace={true} />;
}