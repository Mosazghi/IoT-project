import { Navigate, Outlet } from "react-router-dom";
import cookies from "./cookies";

// En private-rute "håndterer" - sjkekker om brukeren er logget inn eller ikke
export default function ProtectedRoutes() {
    const token = cookies.get("TOKEN");
    return token ? <Outlet /> : <Navigate to="/" />;
}
