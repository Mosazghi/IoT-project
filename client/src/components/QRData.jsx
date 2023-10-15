import React from "react";
import QRCode from "react-qr-code";

const QRData = ({data}) => {
    return (
    <div className="flex">
        <div className="m-auto">
            <QRCode value={data}/>
        </div>
    </div>
    );
};
export default QRData;
