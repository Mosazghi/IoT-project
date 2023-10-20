import ScannedQRCode from "../../models/scannedQRModel.js";

const getTotalScannedQR = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const totalScans = await ScannedQRCode.countDocuments({
    timestamp: { $gte: today, $lt: tomorrow }
  });

  return totalScans;
};

export default getTotalScannedQR;
