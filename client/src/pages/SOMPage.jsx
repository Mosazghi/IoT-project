import GaugeData from "../components/GaugeData";

function SOMPage() {
    return (
        <>
            <h1 className=" text-3xl">Hallo</h1>
            <GaugeData value={20} title={"Temperatur"} />
        </>
    );
}

export default SOMPage;
