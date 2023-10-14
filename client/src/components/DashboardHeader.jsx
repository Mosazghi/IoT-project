import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";
const DashboardHeader = ({ user }) => {
    const navigate = useNavigate();

    // Funksjon for å logge ut brukeren
    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/");
    };

    return (
        <header className="transition-all flex flex-row justify-between shadow-md p-3 items-center mb-5">
            <h1 className="ms-5 text-xl md:text-5xl xl:text-7xl text-center">Velkommen tilbake {user.name}!</h1>
            <button
                onClick={handleLogout}
                className="text-blue-400 hover:bg-blue-200 font-extrabold p-3 border rounded-xl me-5 "
            >
                LOGUT
            </button>
        </header>
    );
};

export default DashboardHeader;
