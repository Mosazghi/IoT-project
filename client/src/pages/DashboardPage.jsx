import jwt from "jwt-decode";
import DashboardHeader from "../components/DashboardHeader";
import QRData from "../components/QRData";
import SensorData from "../components/SensorData";
import cookies from "../utils/cookies";
import { useState } from "react";

// Dashboard-sida - her kan brukeren scanne QR-koden eller se oversiktlig data (hvis brukeren er admin)
function DashboardPage() {
    const [showSensorData, setShowSensorData] = useState(true);
    // Henter ut brukerens token fra cookies og dekoder den
    const token = cookies.get("TOKEN");
    const user = jwt(token);
    const isAdmin = user.admin;

    const toggleSensorData = () => { 
        if(isAdmin){
            setShowSensorData(!showSensorData);
        }
    };

    return (
        <div className="mx-auto my-0 min-h-screen  px-3">
            <DashboardHeader user={user} toggleSwitch={toggleSensorData} showData={showSensorData}/>
            <h3 className="text-center text-2xl font-bold mb-5">
                {isAdmin && showSensorData ? "Oversiktlig data" : "Her kan du scanne QR-koden"}
            </h3>
            {isAdmin && showSensorData ? <SensorData /> : <QRData data={user.id} />}
        </div>
    );
}

export default DashboardPage;
