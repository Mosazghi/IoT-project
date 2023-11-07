import ReactSpeedometer from "react-d3-speedometer";

const GaugeData = ({ value, min, max, unit }) => {
    console.log("value", value);
    value = parseFloat(value[value.length - 1]) ? parseFloat(value[value.length - 1]) : min;
    return (
            <ReactSpeedometer
                maxValue={max}
                minValue={min}
                height={150}
                width={190}
                value={value}
                needleTransition="easeQuadIn"
                needleTransitionDuration={1000}
                needleColor="black"
                startColor="green"
                segments={10}
                endColor="red"
                currentValueText={`${value} ${unit}`}
            />
    );
};
export default GaugeData;
