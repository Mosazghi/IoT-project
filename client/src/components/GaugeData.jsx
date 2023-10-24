import ReactSpeedometer from "react-d3-speedometer";

const GaugeData = ({ value, min, max, unit }) => {
    console.log("value", value);
    value = parseFloat(value[value.length - 1]) ? parseFloat(value[value.length - 1]) : min;
    return (
        <div className="p-5">
            <ReactSpeedometer
                maxValue={max}
                minValue={min}
                height={150}
                width={200}
                value={value}
                needleTransition="easeQuadIn"
                needleTransitionDuration={1000}
                needleColor="black"
                startColor="green"
                segments={10}
                endColor="red"
                currentValueText={`${value} ${unit}`}
            />
        </div>
    );
};
export default GaugeData;
