import QRCode from "react-qr-code";

const QRData = ({ data }) => {
    return (
        <h4 className="text-center ml-5">
            <QRCode value={data} />
        </h4>
    );
};
export default QRData;
