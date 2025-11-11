import axios from "axios";
import { Button } from "react-bootstrap";
import { baseURL, LOGOUT } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

export default function Logout() {

    //Cookie
    const cookie = Cookie();
    const token = cookie.get("e-commerce_R")

    //Navigate
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const res = await axios.get(`${baseURL}/${LOGOUT}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            navigate("/login");
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    return <Button className="primary" onClick={handleLogout}>Logout</Button>
}