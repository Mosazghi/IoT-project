import {
    Chart as ChartJS,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import chartConfig from "../utils/chartConfig";
import { useMqttConnDetails } from "../utils/mqtt/mqttConnDetails";
import { MQTTService } from "../utils/mqtt/mqttService";
import React from "react";

ChartJS.register(
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title
);

const SensorData = () => {
    const [messages, setMessages] = useState([]);
    const connDetails = useMqttConnDetails();
    const { data, options } = chartConfig(messages);

    useEffect(() => {
        if (connDetails) {
            const { mqttServer, mqttTopic } = connDetails;

            const onConnect = (message) => {
                console.log(`MQTT Connected :: ${message}`);
            };

            const onMessage = (topic, message) => {
                const stringResponse = message.toString();
                const messageResponse = JSON.parse(stringResponse);
                console.log(`MQTT Message received :: `, messageResponse);
                setMessages((prevMessages) => [...prevMessages, messageResponse]);
            };

            const onError = (error) => {
                console.log(`Error encountered :: ${error}`);
            };

            const onClose = () => {
                console.log(`MQTT connection closed!`);
            };

            const initializeMQTTConnection = () => {
                console.log(`Initializing connection to :: ${mqttServer}, topic :: ${mqttTopic}`);
                const fnCallbacks = { onConnect, onMessage, onError, onClose };

                const mqttService = new MQTTService(mqttServer, fnCallbacks);
                mqttService.connect();

                mqttService.subscribe(mqttTopic);
            };

            initializeMQTTConnection();
        }
    }, [connDetails]);

    if (!connDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Line data={data} options={options} />

            {messages.map((ms, i) => (
                <div key={i}>
                    <p>{JSON.stringify(ms)}</p>
                </div>
            ))}
        </div>
    );
};

export default SensorData;
