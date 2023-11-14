import { useEffect, useState } from "react";

/**
 * Hook for å hente MQTT-tilkoblingsdetaljer fra server
 * @returns {Object} connDetails
 */
export const useMqttConnDetails = () => {
    const [connDetails, setConnDetails] = useState(null);

    const fetchMQTTConnection = () => {
        fetch("/mqttConnDetails", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("MQTT tilkoblingsdetaljer :: ", data);
                setConnDetails(data);
            })
            .catch((error) => console.error("Error med å hente detaljer :", error));
    };

    useEffect(() => {
        fetchMQTTConnection();
    }, []);

    return connDetails;
};
