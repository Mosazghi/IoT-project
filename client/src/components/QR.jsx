import { useEffect } from "react";

const addLib = (url, callback) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
};

// NB! rendres 2 ganger siden det er strict mode!!!! 

const QR = ({data}) => { 
    useEffect(() => {
        addLib("https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js", () => {
            const qr = new QRCode("qrcode", data);
        });
        console.log("test")
    } ,[]);

    return (
        <>
            
            <div id="qrcode"/> 
        </>
    );
};

export default QR;
