import jwt from "jwt-decode";
import DashboardHeader from "../components/DashboardHeader";
import QRData from "../components/QRData";
import SensorData from "../components/SensorData";
import cookies from "../utils/cookies";

// Dashboard-sida - her kan brukeren scanne QR-koden eller se oversiktlig data (hvis brukeren er admin)
function DashboardPage() {
    // Henter ut brukerens token fra cookies og dekoder den
    const token = cookies.get("TOKEN");
    const user = jwt(token);
    const isAdmin = user.admin;
    console.log(isAdmin);

    return (
        <>
            <DashboardHeader user={user} />
            <h3 className="text-center text-2xl font-bold mb-5">
                {isAdmin ? "Oversiktlig data" : "Her kan du scanne QR-koden"}
            </h3>
            {isAdmin ? <SensorData /> : <QRData data={user.id} />}
        </>
    );
}

export default DashboardPage;
