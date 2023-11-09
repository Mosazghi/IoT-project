import QRCode from "react-qr-code";

const QRData = ({ data }) => {
    return (
        <div className="text-center flex justify-center"> //generer QR-koden
            <QRCode value={data} size={300} />
        </div>
    );
};
export default QRData;
