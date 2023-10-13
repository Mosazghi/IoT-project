import jwt from "jwt-decode";
import Header from "../components/Header";
import QRData from "../components/QRData";
import SensorData from "../components/SensorData";
import cookies from "../utils/cookies";

function DashboardPage() {
    // Henter ut brukerens token fra cookies og dekoder den
    const token = cookies.get("TOKEN");
    const user = jwt(token);
    const isAdmin = user.admin;

    return (
        <>
            <Header user={user} />
            <h3 className="text-center text-2xl font-bold mb-5">
                {isAdmin ? "Oversiktlig data" : "Her kan du scanne QR-koden"}
            </h3>
            {isAdmin ? <SensorData /> : <QRData />}
        </>
    );
}

export default DashboardPage;
