import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";
import QRCode from "react-qr-code";

function DashboardPage() {
    const [data, setData] = useState();
    const navigate = useNavigate();

    // Henter ut brukerens token fra cookies og dekoder den
    const token = cookies.get("TOKEN");
    const user = jwt(token);

    // Funksjon for å logge ut brukeren
    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/");
    };

    // Henter (test)data fra backend
    useEffect(() => {
        let ignore = false;

        async function getCourses() {
            const res = await fetch("/api");
            const data = await res.json();
            if (!ignore) {
                setData(data.message);
            }
        }
        getCourses();
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            <h1 className="text-red-800 text-7xl">Velkommen tilbake {user.name}!</h1>
            <p>Mottatt data fra backend: {data}</p>
            <button onClick={handleLogout} className="text-blue-400 font-extrabold p-4 border  border-red-500">
                LOGUT
            </button>
            <QRCode value={user.name}/>
        </>
    );
}

export default DashboardPage;
