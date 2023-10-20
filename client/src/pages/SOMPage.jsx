import jwt from "jwt-decode";
import DashboardHeader from "../components/DashboardHeader";
import QRData from "../components/QRData";
import SensorData from "../components/SensorData";
import cookies from "../utils/cookies";
import GaugeData from "../components/GaugeData";


function SOMPage() {
    // Henter ut brukerens token fra cookies og dekoder den
    const token = cookies.get("TOKEN");
    const user = jwt(token);
    const isAdmin = user.admin;

    return (
        <>
            <h1 className=" text-3xl">Hallo</h1>
            <GaugeData />
        </>
    );
}

export default SOMPage;
