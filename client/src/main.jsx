import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    // OBS! Med StrictMode vil React kjøre to ganger, dette er for å sjekke at koden vår er skrevet på en god måte.
    // NB! forårsaker at componenten QR blir kjørt 2 ganger!!!! 
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
