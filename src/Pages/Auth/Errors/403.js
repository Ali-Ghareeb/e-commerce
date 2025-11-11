import { Link } from "react-router-dom";
import "./403.css";

export default function Error403({ role }) {
    return (
        <div className="text-wrapper">
            <div className="title" data-content={404}>
                403 - ACCESS DENIED
            </div>
            <div className="subtitle">
                Opps, You don't have permission to access this page.
                <Link style={{ color: "white" }} className="d-block text-center btn btn-primary"
                    to={role === '1996' ? "/dashboard/writer" : "/"}
                >
                    {role === '1996' ? "Go to Writer Page" : "Return to Home Page"}
                </Link>
            </div>
        </div>
    );
}