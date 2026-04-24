export default function GapAnalysis({ rawItems = [] }) {
    const MAX_VOLUME = 28;

    // 🔥 USED VOLUME
    const usedVolume =
        rawItems.reduce(
            (sum, item) =>
                sum +
                ((Number(item.length) || 0) *
                    (Number(item.width) || 0) *
                    (Number(item.height) || 0)),
            0
        ) / 1000000;

    // 🔥 UNUSED
    const unutilizedVolume = rawItems.length
        ? Math.max(0, MAX_VOLUME - usedVolume)
        : 0;

    const unusedPercent = rawItems.length
        ? Math.round((unutilizedVolume / MAX_VOLUME) * 100)
        : 0;

    // 🔥 METRICS
    const locationCount = new Set(
        rawItems.map(item => item.location || "Unknown")
    ).size;

    const orderCount = rawItems.length;

    // 🔥 DISTRIBUTION LOGIC (SMARTER)
    const heavyItemCount = rawItems.length
        ? rawItems.filter(
            item =>
                Number(item.weight) >
                rawItems.reduce(
                    (sum, i) => sum + (Number(i.weight) || 0),
                    0
                ) / rawItems.length
        ).length
        : 0;

    const vehicleCount = rawItems.length
        ? new Set(
            rawItems.map(item => item.vehicleNo || item.truckId || item.vehicle || "Unknown")
        ).size
        : 0;

    let leftShare = 0;
    let topShare = 0;
    let sideShare = 0;
    if (rawItems.length > 0) {
        leftShare = Math.min(0.55, 0.22 + vehicleCount * 0.06 + heavyItemCount * 0.02);
        topShare = Math.min(0.5, 0.24 + Math.min(orderCount, 8) * 0.04);
        sideShare = Math.max(0.15, 1 - leftShare - topShare);

        if (sideShare > 0.55) {
            sideShare = 0.55;
            topShare = Math.max(0.2, 1 - leftShare - sideShare);
        }
    }

    // 🔥 GAP VALUES
    const leftGap = unutilizedVolume * leftShare;
    const topGap = unutilizedVolume * topShare;
    const sideGap = unutilizedVolume * sideShare;

    // 🔥 PIE ANGLES (FIXED)
    const leftAngle = leftShare * 360;
    const topAngle = topShare * 360;

    // 🔥 GRADIENT (SAFE FOR ZERO CASE)
    const chartGradient =
        unutilizedVolume === 0
            ? "#1f2937" // empty gray
            : `conic-gradient(
          #3b82f6 0deg ${leftAngle}deg,
          #facc15 ${leftAngle}deg ${leftAngle + topAngle}deg,
          #8b5cf6 ${leftAngle + topAngle}deg 360deg
        )`;

    return (
        <div className="bg-[#0F213F] p-4 rounded-xl">
            <h2 className="text-gray-300 font-semibold mb-3">
                GAP ANALYSIS
            </h2>

            {/* 🔹 TOTAL UNUSED */}
            <div className="text-xs mb-3">
                <p>Total Unutilized Volume</p>
                <p
                    className={
                        unutilizedVolume > 0
                            ? "text-red-400 font-semibold"
                            : "text-green-400 font-semibold"
                    }
                >
                    {unutilizedVolume.toFixed(1)} m³ ({unusedPercent}%)
                </p>
            </div>

            {/* 🔹 PIE + LEGEND */}
            <div className="flex items-center gap-4">

                {/* PIE */}
                <div
                    className="w-20 h-20 rounded-full"
                    style={{ background: chartGradient }}
                ></div>

                {/* LEGEND */}
                <div className="text-xs space-y-1">
                    <p>🔵 Left Gap: {leftGap.toFixed(1)} m³</p>
                    <p>🟡 Top Gap: {topGap.toFixed(1)} m³</p>
                    <p>🟣 Side Gap: {sideGap.toFixed(1)} m³</p>
                </div>

            </div>
        </div>
    );
}