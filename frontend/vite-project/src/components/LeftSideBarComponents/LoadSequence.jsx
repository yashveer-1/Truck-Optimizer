export default function LoadSequence({ rawItems = [] }) {

    // 🔥 STEP 1: GROUP BY LOCATION
    const grouped = {};

    rawItems.forEach(item => {
        const loc = item.location || "Unknown";

        if (!grouped[loc]) {
            grouped[loc] = {
                items: [],
                weight: 0
            };
        }

        grouped[loc].items.push(item);
        grouped[loc].weight += item.weight || 0;
    });

    // 🔥 STEP 2: CONVERT TO ARRAY (DELIVERY ORDER)
    const locations = Object.entries(grouped);

    // 👉 LIFO → last loaded = first delivered
    const sequence = locations.reverse().map(([loc, data], i) => {

        const itemTypes = [...new Set(
            data.items.map(i =>
                i.type === "drum" ? "Drum" : "Box"
            )
        )].join(", ");

        return {
            seq: i + 1,
            orderId: `O-${10045 + i}`,
            location: loc,
            items: itemTypes,
            position:
                i === 0
                    ? "Near Door"
                    : i === locations.length - 1
                        ? "Front - Bottom"
                        : "Middle"
        };
    });

    return (
        <div className="bg-[#0F213F] p-3 rounded-xl">

            <div className="flex justify-between items-center mb-3 gap-2">
                <div>
                    <h2 className="text-sm font-semibold text-gray-100">
                        LOAD SEQUENCE
                    </h2>
                    <p className="text-gray-500 text-[11px] mt-1">
                        Delivery order preview (LIFO)
                    </p>
                </div>
                <span className="rounded-full border border-gray-700 bg-[#111E3A] px-2 py-1 text-[11px] text-gray-400">
                    {sequence.length} stops
                </span>
            </div>

            <div className="space-y-2">
                {sequence.map((row, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-[#1F3358] bg-[#111E3A] p-3 hover:border-blue-500 transition-colors"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300">
                                    Drop {row.seq}
                                </p>
                                <p className="text-sm font-semibold text-white mt-1">
                                    {row.orderId}
                                </p>
                            </div>
                            <span className="rounded-full bg-blue-600/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-200">
                                {row.position}
                            </span>
                        </div>

                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                            <div className="rounded-2xl bg-[#0F1D37] p-2">
                                <p className="text-[10px] uppercase text-gray-500">
                                    Location
                                </p>
                                <p className="mt-1 text-[12px] text-gray-100">
                                    {row.location}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-[#0F1D37] p-2">
                                <p className="text-[10px] uppercase text-gray-500">
                                    Items
                                </p>
                                <p className="mt-1 text-[12px] text-gray-100">
                                    {row.items}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-gray-500 text-[11px] mt-3">
                Note: Load sequence is LIFO
            </p>

        </div>
    );
}