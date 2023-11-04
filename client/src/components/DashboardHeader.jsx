import { useState } from "react";
import { FaPowerOff, FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";

const DashboardHeader = ({ user }) => {
    const [showUser, setShowUser] = useState(false);
    const navigate = useNavigate();

    // Funksjon for å logge ut brukeren
    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/");
    };

    return (
        <header className="transition-all flex flex-row justify-between shadow-lg p-3 items-center mb-5 w-full">
            <h1 className="ms-5 text-xl md:text-5xl xl:text-7xl font-bold">DASHBOARD</h1>
            <div className="flex justify-items-end gap-2">
                <div>
                    <button
                        onClick={() => setShowUser(!showUser)}
                        onTouchMove={() => setShowUser(!showUser)}
                        className="w-12 h-12 bg-slate-200 shadow-inner hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500      rounded-full grid justify-items-center content-center"
                    >
                        <FaUserLarge className="text-2xl text-white" />
                    </button>
                    {showUser ? <h4 className="flex justify-center">{user.name}</h4> : null}
                </div>
                <div>
                    <button
                        onClick={handleLogout}
                        className="w-12 h-12 bg-slate-200 shadow-inner hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full grid justify-items-center content-center"
                    >
                        <FaPowerOff className="text-2xl text-white" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
