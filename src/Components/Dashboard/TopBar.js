import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { baseURL, LOGOUT, USER } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function TopeBar() {

    const [name, setName] = useState("");

    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;

    //Navigate
    const navigate = useNavigate();

    const cookie = Cookie();
    const token = cookie.get("e-commerce_R");

    console.log(setIsOpen);

    useEffect(() => {
        axios.get(`${baseURL}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((data) => setName(data.data.name))
            .catch(() => navigate("/login", { replace: true }));
    }, []);

    async function handleLogout() {
        try {
            let res = await axios.get(`${baseURL}/${LOGOUT}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            cookie.remove("e-commerce_R");
            window.location.pathname = "/login";
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="top-bar d-flex align-items-center justify-content-between">
            <div className="d-flex w-100 align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3" >
                    <h3>E-COMMERCE</h3>
                    <FontAwesomeIcon onClick={() => setIsOpen((prev) => !prev)}
                        cursor={"pointer"} icon={faBars} />
                </div>
                <div>
                    <DropdownButton id="dropdown-basic-button" title={name}>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </div>
    );
}