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
import { Constants } from "../utils/constants";
import { useMqttConnDetails } from "../utils/mqtt/mqttConnDetails";
import { MQTTService } from "../utils/mqtt/mqttService";
import GaugeData from "./GaugeData";

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
    // @ts-ignore
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
    console.log("dataaaa", messages);

    return (
        <>
            <div className="flex justify-center items-center">
                <Line data={data} options={options} height={400} width={400} />
            </div>
            <GaugeData
                value={messages.map((data) => data?.data.temperature)}
                min={Constants.TEMPERATURE_MIN}
                max={Constants.TEMPERATURE_MAX}
                unit={"°C"}
                title={"Temperatur"}
            />
            {/* <GaugeData
                value={messages.map((data) => data?.data.humidity)}
                min={Constants.HUMIDITY_MIN}
                max={Constants.HUMIDITY_MAX}
                unit={}
                title={"Humidity"}
            />
            <GaugeData
                value={messages.map((data) => data?.data.co2)}
                min={Constants.CO2_MIN}
                max={Constants.CO2_MAX}
                unit={}
                title={"C02"}
            /> */}
            {messages.map((ms, i) => (
                <div key={i}>
                    <p>{JSON.stringify(ms)}</p>
                </div>
            ))}
        </>
    );
};

export default SensorData;
