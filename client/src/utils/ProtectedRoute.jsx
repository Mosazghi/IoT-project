import { Navigate, Outlet } from "react-router-dom";
import cookies from "./cookies";

// receives component and any other props represented by ...rest
export default function ProtectedRoutes() {
    const token = cookies.get("TOKEN");
    return token ? <Outlet /> : <Navigate to="/" />;
}
