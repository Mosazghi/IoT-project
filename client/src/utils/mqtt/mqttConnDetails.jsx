import { useEffect, useState } from "react";

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
                console.log("MQTT Connection details :: ", data);
                setConnDetails(data);
            })
            .catch((error) => console.error("Error getting MQTT Connection :", error));
    };

    useEffect(() => {
        fetchMQTTConnection();
    }, []);
  
    return connDetails;
};
