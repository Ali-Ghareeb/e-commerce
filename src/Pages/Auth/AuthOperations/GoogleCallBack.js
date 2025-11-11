import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookie from 'cookie-universal';
import { baseURL, GOOGLE_CALL_BACK } from "../../../Api/Api";

export default function GoogleCallBack() {

    // Cookies
    const cookie = Cookie()

    // location
    const location = useLocation();

    useEffect(() => {
        async function GoogleCall() {
            try {
                const res = await axios.get(
                    `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
                );
                console.log(res);
                const token = res.data.access_token;
                cookie.set("ecommerce_R", token);
            }
            catch (err) {
                console.log(err);
            }
        }
        GoogleCall();
    }, []);
    return <h1>Test</h1>;
}