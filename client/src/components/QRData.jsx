import QRCode from "react-qr-code";

const QRData = (data) => {
    return <h4 className="text-center animate-bounce">
        <QRCode value={data}/>
    </h4>;
};
export default QRData;
