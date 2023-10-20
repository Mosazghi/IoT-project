import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Link, useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";
import axios from "axios";

const GaugeData = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className=" bg-gradient-to-r from-gray-50 to-gray-200 shadow-inner h-64 flex justify-item-center rounded-full ">
                <ReactSpeedometer
                    maxValue={100}
                    value={60}
                    segments={4}
                    currentValueText="TEMPRATURE"
                    segmentColors={['#083D77', '#F4D35E', '#F78764', '#DA4167']}
                    customSegmentLabels={[
                        {
                        text: 'SAFE',
                        position: 'INSIDE',
                        color: '#EBEBD3',
                        },
                        {
                        text: 'CAUTION',
                        position: 'INSIDE',
                        color: '#EBEBD3',
                        },
                        {
                        text: 'WARNING',
                        position: 'INSIDE',
                        color: '#EBEBD3',
                        //fontSize: '19px',
                        },
                        {
                        text: 'DANGER',
                        position: 'INSIDE',
                        color: '#EBEBD3',
                        },
                    ]}
                    ringWidth={47}
                    needleTransitionDuration={3333}
                    needleTransition="easeElastic"
                    needleColor={'#363636'}
                    textColor={'#363636'}
                />
            </div>
        </div>
    );
};
export default GaugeData;
{/* 

        <div className="flex flex-col items-center">
            <ReactSpeedometer
                maxValue={100}
                value={data}
                needleColor="red"
                startColor="green"
                segments={10}
                endColor="red"
                textColor="black"
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                needleHeightRatio={0.7}
                ringWidth={50}
                height={300}
                width={500}
                paddingVertical={0}
                paddingHorizonal={0}
                currentValueText="Current value: ${value}"
            />
        </div>
        
    */}