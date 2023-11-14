import ScannedQRCode from "../../models/scannedQRModel.js";

/**
 *  Henter totalt antall scanninger av QR-koder med tilhlørende dato
 * 
 *  @returns {Promise<Array<{id: string, totalScans: number}>>} Array av objekter med dato (ID) og totalScans
 */
const getTotalScannedQR = async () => {
    const totalScans = await ScannedQRCode.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                totalScans: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                id: "$_id",
                totalScans: 1,
            },
        },
    ]);
    return totalScans;
};

export default getTotalScannedQR;
