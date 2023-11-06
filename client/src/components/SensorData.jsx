import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import barChartConfig from "../configs/barChartConfig";
import configureCharts from "../configs/chartConfig";
import lineChartConfig from "../configs/lineChartConfig";
import { Constants } from "../utils/constants";
import { useMqttConnDetails } from "../utils/mqtt/mqttConnDetails";
import { MQTTService } from "../utils/mqtt/mqttService";
import GaugeData from "./GaugeData";
import Test from "./test";

// Konfigurerer ChartJS
configureCharts();

const SensorData = () => {
    // Bruker useState for å lagre data fra MQTT i en array
    // (sensorData for data fra sensoren og statsData for daglig-statistikk)
    const [sensorData, setSensorData] = useState([]);
    const [statsData, setStatsData] = useState([]);

    // Henter ut MQTT-tilkoblingsdetaljer fra serveren (MQTT-server, topic1 og topic2)
    const connDetails = useMqttConnDetails();

    // Konfigurerer linje- og søylediagrammet
    const { dataLine, optionsLine } = lineChartConfig(sensorData);
    const { dataBar, optionsBar } = barChartConfig(statsData);

    useEffect(() => {
        let mqttService;

        if (connDetails) {
            const { mqttServer, mqttTopic1, mqttTopic2 } = connDetails;

            const onConnect = (message) => {
                console.log(`MQTT Connected :: ${message}`);
            };

            // Når en melding mottas, legg den til i listen over meldinger (sensorData eller statsData)
            const onMessage = (topic, message) => {
                const messageResponse = JSON.parse(message.toString());
                console.log(`MQTT Message received :: `, messageResponse, topic);

                // Legg til i sensorData hvis topic er mqttTopic1 (sensor), ellers legg til i statsData (stats)
                if (topic === mqttTopic1) setSensorData((prevMessages) => [...prevMessages, messageResponse]);
                if (topic === mqttTopic2) setStatsData(messageResponse);
            };

            const onError = (error) => {
                console.log(`Error encountered :: ${error}`);
            };

            const onClose = () => {
                console.log(`MQTT connection closed!`);
            };

            console.log(`Initializing connection to :: ${mqttServer}, topics :: ${mqttTopic1} and ${mqttTopic2}`);
            const fnCallbacks = { onConnect, onMessage, onError, onClose };
            mqttService = new MQTTService(mqttServer, fnCallbacks);
            mqttService.connect();
            mqttService.subscribe(mqttTopic1);
            mqttService.subscribe(mqttTopic2);
        }

        return () => {
            if (mqttService) {
                mqttService.end();
            }
        };
    }, [connDetails]);

    if (!connDetails) {
        return <div>Loading...</div>;
    }
    console.log("dataaaa", sensorData);

    return (
        <div className="grid-cols-1 grid-rows-3 h-screen">
            <div className="w-full bg-white rounded-2xl shadow-md">
                 <Bar data={dataBar} options={optionsBar} height={300} width={250} />
            </div>
            <div className="py-5 flex flex-wrap items-center gap-3 justify-center md:justify-evenly">
                <div className=" bg-white w-52 flex justify-center pt-6 shadow-md rounded-3xl">
                    <GaugeData
                        value={sensorData.map((data) => data?.data.temperature)}
                        min={Constants.TEMPERATURE_MIN}
                        max={Constants.TEMPERATURE_MAX}
                        unit={"°C"}
                    />
                </div>
                <div className=" bg-white w-52 flex justify-center pt-6 shadow-md rounded-3xl">
                    <GaugeData
                        value={sensorData.map((data) => data?.data.humidity)}
                        min={Constants.HUMIDITY_MIN}
                        max={Constants.HUMIDITY_MAX}
                        unit={"%"}
                    />
                </div>
                <div className=" bg-white w-52 flex justify-center pt-6 shadow-md rounded-3xl">
                    <GaugeData
                        value={sensorData.map((data) => data?.data.co2)}
                        min={Constants.CO2_MIN}
                        max={Constants.CO2_MAX}
                        unit={"ppm"}
                    />
                </div>
            </div>
            <div className="w-full bg-white rounded-2xl shadow-md mb-4">
                 <Line data={dataLine} options={optionsLine} height={300} width={250} />
            </div>
            
        </div>
    );
};

export default SensorData;
