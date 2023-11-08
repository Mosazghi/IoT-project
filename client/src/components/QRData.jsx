import QRCode from "react-qr-code";

const QRData = ({ data }) => {
    return (
        <div className="text-center ml-5 flex justify-center">
            <QRCode value={data} size={300} />
        </div>
    );
};
export default QRData;
