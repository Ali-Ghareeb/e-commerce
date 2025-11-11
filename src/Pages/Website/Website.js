import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Website/Navbar/Navbar";

export default function Website() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}