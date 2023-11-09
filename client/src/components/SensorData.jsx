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
import sensorData from "./sensorData";
import ReactSpeedometer from "react-d3-speedometer";


// Konfigurerer ChartJS
configureCharts();

const SensorData = () => {
    // Bruker useState for å lagre data fra MQTT i en array
    // (sensorData for data fra sensoren og statsData for daglig-statistikk)
    // const [sensorData, setSensorData] = useState([]);
    // const [statsData, setStatsData] = useState([]);
 
    // 60-WATT LAMPE
    // 60 watt-timer÷1000=0.06 kWh
    // 0.06 kWh×xTimer timer= x.xx kWh

    const statsData = [
        { id: "2023-11-07", averageTemp: 0.182, totalScans: 4 },
        { id: "2023-11-08", averageTemp: 0.197, totalScans: 2 },
        { id: "2023-11-09", averageTemp: 0.176, totalScans: 3 },
    ];
    // Henter ut MQTT-tilkoblingsdetaljer fra serveren (MQTT-server, topic1 og topic2)
    const connDetails = useMqttConnDetails();

    // Konfigurerer linje- og søylediagrammet
    const { dataLine, optionsLine } = lineChartConfig(sensorData);
    const { dataBar, optionsBar } = barChartConfig(statsData);

    // useEffect(() => {
    //     let mqttService;

    //     // Hvis MQTT-tilkoblingsdetaljer er hentet fra serveren, opprett en MQTT-tilkobling
    //     if (connDetails) {
    //         const { mqttServer, mqttTopic1, mqttTopic2 } = connDetails;

    //         const onConnect = (message) => {
    //             console.log(`MQTT tilkoblet! :: ${message}`);
    //         };

    //         // Når en melding mottas, legg den til i listen over meldinger (sensorData eller statsData)
    //         const onMessage = (topic, message) => {
    //             const messageResponse = JSON.parse(message.toString());
    //             console.log(`MQTT melding mottatt :: `, messageResponse, topic);

    //             // Legg til i motatt data basert på topic - statistikk eller sensordata
    //             if (topic === mqttTopic1) setSensorData((prevMessages) => [...prevMessages, messageResponse]);
    //             if (topic === mqttTopic2) setStatsData(messageResponse);
    //         };

    //         const onError = (error) => {
    //             console.log(`Error oppdaget :: ${error}`);
    //         };

    //         const onClose = () => {
    //             console.log(`MQTT tilkobling avbrutt!`);
    //         };

    //         console.log(`Initialiserer tilkobling til :: ${mqttServer}, topics :: ${mqttTopic1} og ${mqttTopic2}`);

    //         const fnCallbacks = { onConnect, onMessage, onError, onClose };
    //         mqttService = new MQTTService(mqttServer, fnCallbacks);
    //         // Starter tilkoblingen til MQTT-serveren og abonnerer på topic1 og topic2
    //         mqttService.connect();
    //         mqttService.subscribe(mqttTopic1);
    //         mqttService.subscribe(mqttTopic2);
    //     }

    //     return () => {
    //         if (mqttService) {
    //             mqttService.end();
    //         }
    //     };
    // }, [connDetails]);

    if (!connDetails) {
        return <div>Loading...</div>;
    }
    console.log("dataaaa", sensorData);

    return (
        <div className="grid-cols-1 grid-rows-3 h-screen">
            {/* // søylediagrammet */}
            <div className="w-full bg-white rounded-2xl shadow-md">
                <Bar data={dataBar} options={optionsBar} height={300} width={250} />
            </div>
            <div className="py-5 flex flex-wrap items-center gap-3 justify-center md:justify-evenly">
                {/* // gauge diagrammene temperature, humidity og co2 */}
                <div className=" bg-white w-52 flex justify-center pt-6 shadow-md rounded-3xl">
                    <ReactSpeedometer
                        maxValue={0}
                        minValue={30}
                        height={150}
                        width={190}
                        value={24.60}
                        needleTransition="easeQuadIn"
                        needleTransitionDuration={1000}
                        needleColor="black"
                        startColor="green"
                        segments={10}
                        endColor="red"
                        currentValueText={`${24.60} ${'℃'}`}
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
                        unit={"C02"}
                    />
                </div>
                <div className=" bg-white w-52 flex justify-center pt-6 shadow-md rounded-3xl">
                    <GaugeData
                        value={sensorData.map((data) => data?.data.pressure)}
                        min={Constants.PRESSURE_MIN}
                        max={Constants.PRESSURE_MAX}
                        unit={"ppm"}
                    />
                </div>
            </div>
             {/* linje diagrammet for temperaturen */}
            <div className="w-full bg-white rounded-2xl shadow-md mb-4">
                <Line data={dataLine} options={optionsLine} height={300} width={250} />
            </div>
        </div>
    );
};

export default SensorData;
