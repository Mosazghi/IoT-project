import ReactSpeedometer from "react-d3-speedometer";

const GaugeData = ({ value, min, max, title, unit }) => {
    console.log("value", value);
    value = parseFloat(value[value.length - 1]) ? parseFloat(value[value.length - 1]) : min;
    return (
        <div className="inline-block w-[300px] h-auto border border-solid border-red-50 p-1">
            <ReactSpeedometer
                maxValue={max}
                minValue={min}
                height={190}
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

            <div className="text-center">{title}</div>
        </div>
    );
};
export default GaugeData;
