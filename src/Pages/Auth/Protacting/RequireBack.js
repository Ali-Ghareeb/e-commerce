import Cookie from 'cookie-universal';
import { Outlet } from 'react-router-dom';

export default function RequireBack() {

    //Token & Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce_R");

    return token ? (window.history.go(-1), window.location.reload()) : <Outlet />;
}